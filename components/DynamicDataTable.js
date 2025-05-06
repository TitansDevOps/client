import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";

const DynamicDataTable = ({
  title = "",
  placeholder = "Buscar...",
  data = [],
  columns = [],
  totalRecords = 0,
  loading = false,
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRows = 10,
  showGlobalFilter = true,
  showHeader = true,
  stripedRows = true,
  paginator = true,
  lazy = true,
  onPageChange = () => {},
  onSort = () => {},
  rowActions = null,
  selectionMode = null,
  onSelectionChange = null,
  selectedItems = null,
  scrollable = false,
  scrollHeight = "flex",
  className = "",
  style = {},
  emptyMessage = "No se encontraron registros",
  toastRef = null,
  onReload = () => {},
}) => {
  const [filters, setFilters] = useState({
    global: { value: "", matchMode: "contains" },
  });

  const header = showHeader && (
    <div className="flex flex-col pb-2 space-y-4">
      {title && <h2 className="text-3xl font-bold m-0">{title}</h2>}

      {showGlobalFilter && (
        <div className="flex justify-end">
          <div className="hover-text-blue-500">
            <Tooltip
              target=".reload-icon"
              content="Reload"
              position="top"
              className=""
            />
            <i
              className="reload-icon pr-5 pi pi-sync hover:cursor-pointer not-sr-only"
              onClick={() => onReload()}
              style={{ cursor: "pointer", userSelect: "none" }}
            />
          </div>
          <div className="flex items-center">
            <i className="pi pi-search mr-2" onClick={onReload} />
            <InputText
              type="search"
              placeholder={placeholder}
              onInput={(e) =>
                setFilters({
                  ...filters,
                  global: { value: e.target.value, matchMode: "contains" },
                })
              }
              className="p-inputtext-sm"
              style={{ minWidth: "250px" }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderColumns = () => {
    return columns.map((col) => {
      if (col.hidden) return null;

      return (
        <Column
          key={col.field || col.header}
          field={col.field}
          header={col.header}
          sortable={col.sortable}
          body={col.body}
          style={col.style}
          className={col.className}
          headerStyle={col.headerStyle}
          headerClassName={col.headerClassName}
          filter={col.filter}
          filterField={col.filterField}
          filterMatchMode={col.filterMatchMode}
          filterPlaceholder={col.filterPlaceholder}
          filterType={col.filterType}
          filterElement={col.filterElement}
          filterFunction={col.filterFunction}
          dataType={col.dataType}
          exportable={col.exportable !== false}
          expander={col.expander}
          frozen={col.frozen}
          alignFrozen={col.alignFrozen}
          align={col.align}
          editor={col.editor}
          onEditorSubmit={col.onEditorSubmit}
          editorValidator={col.editorValidator}
          onEditorCancel={col.onEditorCancel}
          onEditorInit={col.onEditorInit}
          onCellClick={col.onCellClick}
          onCellSelect={col.onCellSelect}
          onCellContextMenu={col.onCellContextMenu}
          onSort={col.onSort || onSort}
        />
      );
    });
  };

  return (
    <div
      className={`card px-2 shadow-2 border-round-lg ${className}`}
      style={style}
    >
      <Toast ref={toastRef} />

      <DataTable
        header={header}
        value={data}
        paginator={paginator}
        rows={defaultRows}
        totalRecords={totalRecords}
        rowsPerPageOptions={rowsPerPageOptions}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
        filters={filters}
        filterDisplay="row"
        stripedRows={stripedRows}
        removableSort
        className="p-datatable-sm"
        emptyMessage={emptyMessage}
        loading={loading}
        loadingIcon="pi pi-spinner"
        lazy={lazy}
        onPage={onPageChange}
        selectionMode={selectionMode}
        selection={selectedItems}
        onSelectionChange={onSelectionChange}
        scrollable={scrollable}
        scrollHeight={scrollHeight}
      >
        {selectionMode && (
          <Column
            selectionMode={selectionMode}
            headerStyle={{ width: "3em" }}
          />
        )}

        {renderColumns()}

        {rowActions && (
          <Column
            body={rowActions}
            header="Acciones"
            style={{ width: "150px" }}
            exportable={false}
          />
        )}
      </DataTable>
    </div>
  );
};

export default DynamicDataTable;
