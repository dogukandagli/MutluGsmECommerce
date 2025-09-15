import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  SearchPanel,
  Paging,
  Pager,
  Sorting,
} from "devextreme-react/data-grid";
import ODataStore from "devextreme/data/odata/store";

const dataSourceOptions = {
  store: new ODataStore({
    version: 4, // senin API v4
    url: "https://localhost:7261/odata/Products",
    key: "id", // product içindeki primary key
  }),
};

// ürün tablosu
const AdminDashboard = () => (
  <DataGrid
    dataSource={dataSourceOptions}
    showBorders={true}
    remoteOperations={true} // filtre/sort işlemleri server'a OData query olarak gider
    columnAutoWidth={true}
    rowAlternationEnabled={true}
    height={520}
  >
    {/* Arama ve filtreleme */}
    <FilterRow visible={true} /> {/* kolon bazlı filtre */}
    <HeaderFilter visible={true} /> {/* drop-down filtre */}
    <SearchPanel visible={true} highlightCaseSensitive={false} />{" "}
    {/* global search */}
    <Sorting mode="multiple" /> {/* çoklu kolon sıralama */}
    {/* Sayfalama */}
    <Paging defaultPageSize={10} />
    <Pager
      showPageSizeSelector={true}
      allowedPageSizes={[10, 20, 50]}
      showInfo={true}
    />
    {/* Kolonlar */}
    <Column dataField="name" caption="Ürün Adı" width={200} />
    <Column dataField="categoryName" caption="Kategori" width={150} />
    <Column dataField="brandName" caption="Marka" width={150} />
    <Column dataField="quantity" caption="Adet" dataType="number" width={80} />
    <Column
      dataField="condition"
      caption="Durum"
      width={120}
      calculateDisplayValue={(rowData) =>
        rowData.condition === 1 ? "Yeni" : "İkinci El"
      }
    />
    <Column
      dataField="featured"
      caption="Vitrin"
      dataType="boolean"
      width={100}
    />
    <Column
      dataField="isActive"
      caption="Aktif"
      dataType="boolean"
      width={100}
    />
    <Column
      dataField="createdDate"
      caption="Kayıt Tarihi"
      dataType="date"
      format="dd.MM.yyyy HH:mm"
      width={180}
    />
    <Column
      dataField="updatedDate"
      caption="Güncelleme Tarihi"
      dataType="date"
      format="dd.MM.yyyy HH:mm"
      width={180}
    />
  </DataGrid>
);

export default AdminDashboard;
