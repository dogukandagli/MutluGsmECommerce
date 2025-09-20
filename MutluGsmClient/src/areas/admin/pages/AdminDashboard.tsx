import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// OData endpoint'in
const ODATA_BASE_URL = "https://localhost:7261/odata/Products";

// Domain tipin
export interface Product {
  id: number;
  name: string;
  categoryName?: string | null;
  brandName?: string | null;
  quantity?: number;
  condition?: 0 | 1; // 1=Yeni, 0=İkinci El (senin API'ye göre düzenle)
  featured?: boolean;
  isActive?: boolean;
  createdDate?: string; // ISO
  updatedDate?: string; // ISO
}

/** AG Grid -> OData çeviriciler (sade, iş gören) */
function buildOrderBy(sortModel: any[] = []): string | null {
  if (!sortModel.length) return null;
  const parts = sortModel.map((s) => `${s.colId} ${s.sort}`);
  return `$orderby=${encodeURIComponent(parts.join(","))}`;
}

function escapeOdata(v: string) {
  return v.replace(/'/g, "''");
}

function buildFilter(filterModel: Record<string, any> = {}): string | null {
  const clauses: string[] = [];

  Object.entries(filterModel).forEach(([field, conf]) => {
    if (!conf) return;

    const nodes = conf.operator
      ? [conf.condition1, conf.condition2].filter(Boolean)
      : [conf];

    const local: string[] = [];

    nodes.forEach((n) => {
      const type = n.filterType || conf.filterType;

      if (type === "text") {
        const val = escapeOdata(String(n.filter ?? ""));
        const t = n.type; // contains | startsWith | endsWith | equals | notEqual
        if (t === "contains") local.push(`contains(${field},'${val}')`);
        else if (t === "startsWith")
          local.push(`startswith(${field},'${val}')`);
        else if (t === "endsWith") local.push(`endswith(${field},'${val}')`);
        else if (t === "notEqual") local.push(`${field} ne '${val}'`);
        else local.push(`${field} eq '${val}'`);
      } else if (type === "number") {
        const val = Number(n.filter);
        const map: Record<string, string> = {
          equals: "eq",
          notEqual: "ne",
          lessThan: "lt",
          lessThanOrEqual: "le",
          greaterThan: "gt",
          greaterThanOrEqual: "ge",
        };
        const op = map[n.type] || "eq";
        local.push(`${field} ${op} ${val}`);
      } else if (type === "date") {
        // basit eşitlik – ihtiyaca göre >= <= aralık ekleyebilirsin
        const iso = new Date(n.dateFrom || n.filter).toISOString();
        local.push(`${field} eq ${iso}`);
      }
    });

    if (local.length) {
      const joiner = conf.operator === "OR" ? " or " : " and ";
      clauses.push(`(${local.join(joiner)})`);
    }
  });

  if (!clauses.length) return null;
  return `$filter=${encodeURIComponent(clauses.join(" and "))}`;
}

function buildOdataUrl(req: IGetRowsParams): string {
  const top = req.endRow - req.startRow;
  const skip = req.startRow;

  const q: string[] = ["$count=true", `$top=${top}`, `$skip=${skip}`];

  const ob = buildOrderBy(req.sortModel as any[]);
  if (ob) q.push(ob);

  const flt = buildFilter(req.filterModel as any);
  if (flt) q.push(flt);

  return `${ODATA_BASE_URL}?${q.join("&")}`;
}

const AdminDashboardAgGrid: React.FC = () => {
  const gridRef = useRef<AgGridReact<Product>>(null);
  const [quick, setQuick] = useState("");

  const columnDefs = useMemo<ColDef<Product>[]>(
    () => [
      {
        field: "name",
        headerName: "Ürün Adı",
        filter: "agTextColumnFilter",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "categoryName",
        headerName: "Kategori",
        filter: "agSetColumnFilter",
        minWidth: 150,
      },
      {
        field: "brandName",
        headerName: "Marka",
        filter: "agSetColumnFilter",
        minWidth: 150,
      },
      {
        field: "quantity",
        headerName: "Adet",
        filter: "agNumberColumnFilter",
        type: "rightAligned",
        width: 110,
      },
      {
        field: "condition",
        headerName: "Durum",
        filter: "agSetColumnFilter",
        width: 130,
        valueFormatter: (p) => (p.value === 1 ? "Yeni" : "İkinci El"),
      },
      {
        field: "featured",
        headerName: "Vitrin",
        filter: "agSetColumnFilter",
        width: 110,
      },
      {
        field: "isActive",
        headerName: "Aktif",
        filter: "agSetColumnFilter",
        width: 110,
      },
      {
        field: "createdDate",
        headerName: "Kayıt Tarihi",
        filter: "agDateColumnFilter",
        width: 190,
        valueFormatter: (p) =>
          p.value ? new Date(p.value as string).toLocaleString("tr-TR") : "",
      },
      {
        field: "updatedDate",
        headerName: "Güncelleme Tarihi",
        filter: "agDateColumnFilter",
        width: 190,
        valueFormatter: (p) =>
          p.value ? new Date(p.value as string).toLocaleString("tr-TR") : "",
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef<Product>>(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true, // FilterRow hissi
      resizable: true,
    }),
    []
  );

  // Tek ve yalın datasource (IDatasource)
  const datasource = useMemo<IDatasource>(
    () => ({
      async getRows(params: IGetRowsParams) {
        try {
          const url = buildOdataUrl(params);
          const resp = await fetch(url, {
            headers: { Accept: "application/json" },
          });
          const json = await resp.json();
          const rows: Product[] = json.value ?? [];
          const total =
            typeof json["@odata.count"] === "number"
              ? json["@odata.count"]
              : rows.length;
          params.successCallback(rows, total);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("OData getRows error:", e);
          params.failCallback();
        }
      },
    }),
    []
  );

  const onGridReady = useCallback(
    (e: GridReadyEvent) => {
      // yeni API
      e.api.setGridOption("datasource", datasource);
    },
    [datasource]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* DevExtreme SearchPanel muadili */}
      <input
        value={quick}
        onChange={(ev) => {
          const v = ev.target.value;
          setQuick(v);
          // yeni API – setQuickFilter yok
          gridRef.current?.api.setGridOption("quickFilterText", v);
        }}
        placeholder="Ara..."
        style={{ padding: 8, maxWidth: 320 }}
      />

      <div className="ag-theme-alpine" style={{ height: 520, width: "100%" }}>
        <AgGridReact<Product>
          ref={gridRef}
          rowModelType="infinite"
          // pagination görünümü (Community)
          pagination
          paginationPageSize={10}
          cacheBlockSize={10} // her blokta çekilecek kayıt (=$top)
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={(p) => String(p.data?.id)} // key: "id"
          quickFilterText={quick}
          onGridReady={onGridReady}
          animateRows
        />
      </div>

      {/* Sayfa boyutu seçenekleri */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>Sayfa boyutu:</span>
        {[10, 20, 50].map((sz) => (
          <button
            key={sz}
            onClick={() =>
              gridRef.current?.api.setGridOption("paginationPageSize", 20)
            }
          >
            {sz}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardAgGrid;
