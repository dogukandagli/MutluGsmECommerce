import type { ColDef, GridReadyEvent } from "ag-grid-community";
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ModuleRegistry,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import {
  type ChangeEvent,
  type FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import OdataProvider from "ag-grid-odata";
import SearchIcon from "@mui/icons-material/Search";
import { ActionsCellRenderer } from "../../../shared/cell-renderers/ActionsCellRenderer";
import { ProductCellRenderer } from "../../../shared/cell-renderers/ProductCellRenderer";
import { Box, Container } from "@mui/system";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// sadece community modülleri
ModuleRegistry.registerModules([AllCommunityModule, ClientSideRowModelModule]);

interface Props {
  gridTheme?: string;
  isDarkMode?: boolean;
}

// ---- OData ----
const ODATA_BASE = "https://localhost:7261/odata/Products";

function appendExtraFilter(options: string, extraFilter: string | null) {
  if (!extraFilter) return options;
  const hasEncoded = options.includes("%24filter=");
  const hasPlain = options.includes("$filter=");
  if (!hasEncoded && !hasPlain) {
    const sep = options.includes("?") ? "&" : "?";
    return `${options}${sep}$filter=${encodeURIComponent(extraFilter)}`;
  }
  const key = hasEncoded ? "%24filter=" : "$filter=";
  const idx = options.indexOf(key);
  if (idx === -1) return options;
  const before = options.slice(0, idx + key.length);
  const rest = options.slice(idx + key.length);
  const amp = rest.indexOf("&");
  const currentVal = amp === -1 ? rest : rest.slice(0, amp);
  const tail = amp === -1 ? "" : rest.slice(amp);
  const decoded = decodeURIComponent(currentVal);
  const merged = `(${decoded}) and (${extraFilter})`;
  const reEncoded = encodeURIComponent(merged);
  return `${before}${reEncoded}${tail}`;
}

export const ProductsDataGrid: FunctionComponent<Props> = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // 👈 local state
  const gridTheme = "ag-theme-quartz"; // varsayılan
  const themeClass = isDarkMode ? `${gridTheme}-dark` : gridTheme;

  const quickFilterTextRef = useRef<string>("");
  const [searchValue, setSearchValue] = useState("");

  const onFilterTextBoxChanged = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(value);
      quickFilterTextRef.current = value;
      gridRef.current?.api.purgeInfiniteCache();
    },
    []
  );

  // Kolonlar
  const [colDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Ürün Adı",
      cellRenderer: ProductCellRenderer, // data.imageUrl + data.name kullan
      width: 180,
    },
    { field: "categoryName", headerName: "Kategori", width: 90 },
    { field: "brandName", headerName: "Marka" },
    {
      field: "quantity",
      headerName: "Adet",
      filter: "agNumberColumnFilter",
      width: 100,
    },
    {
      field: "originalPrice",
      headerName: "Fiyat",
      filter: "agNumberColumnFilter",
      width: 120,
      valueFormatter: (p) => (p.value != null ? `${p.value} ₺` : "-"),
    },
    {
      field: "condition",
      headerName: "Durum",
      width: 120,
      valueFormatter: (p) => (p.value === 1 ? "Yeni" : "İkinci El"),
    },
    { field: "featured", headerName: "Vitrin", width: 100 },
    { field: "isActive", headerName: "Aktif", width: 50 },
    {
      field: "createdDate",
      headerName: "Kayıt Tarihi",
      width: 180,
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleString("tr-TR") : "",
    },
    {
      field: "updatedDate",
      headerName: "Güncelleme Tarihi",
      width: 180,
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleString("tr-TR") : "",
    },
    { field: "actions", cellRenderer: ActionsCellRenderer, minWidth: 150 },
  ]);

  const defaultColDef = useMemo<ColDef>(
    () => ({ sortable: true, filter: true, resizable: true }),
    []
  );

  // Grid Ready → ag-grid-odata datasource
  const onGridReady = useCallback((e: GridReadyEvent) => {
    const buildSearchFilter = (q: string) => {
      if (!q) return null;
      const esc = q.replace(/'/g, "''");
      const fields = ["name", "categoryName", "brandName", "description"];
      return fields.map((f) => `contains(${f},'${esc}')`).join(" or ");
    };

    const ds = new OdataProvider({
      // ag-grid-odata bize ?$top=...&$skip=...&$orderby=...&$filter=... gibi bir options string verir
      callApi: async (options: string) => {
        const extra = buildSearchFilter(quickFilterTextRef.current);
        const merged = appendExtraFilter(options, extra);
        const url = `${ODATA_BASE}${merged}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });
        return res.json(); // { value: [], "@odata.count": N }
      },
    });

    e.api.setGridOption("datasource", ds);
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="lg">
        {/* header: tabs + search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <TextField
            placeholder="Search product..."
            size="small"
            value={searchValue}
            onChange={onFilterTextBoxChanged}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title={isDarkMode ? "Aydınlık" : "Karanlık"}>
            <IconButton onClick={() => setIsDarkMode((prev) => !prev)}>
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* grid */}
        <Box
          className={themeClass}
          sx={{
            width: "100%",
            minHeight: 420,
          }}
        >
          <AgGridReact
            theme="legacy"
            ref={gridRef}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowHeight={80}
            rowModelType="infinite" // ag-grid-odata bunu kullanır
            cacheBlockSize={10}
            pagination
            paginationPageSize={10}
            onGridReady={onGridReady}
            domLayout="autoHeight"
            masterDetail
            detailRowAutoHeight
          />
        </Box>
      </Container>
    </Box>
  );
};
