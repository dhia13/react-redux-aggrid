import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SelectRow from "./components/SelectRow";
import { useSelector } from "react-redux";

function App() {
  //ref to grid option and api
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  //fetch Row data from server and adding it to rowData state
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);
  // colum definitions add filter and sort functionality
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    }),
    []
  );
  // on Click function that uses grid api to deselect all nodes on click
  const deselectAll = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });
  //state from redux what row to select
  const selectNode = useSelector((state) => state.RowReducer.nodeIndex);
  // use effect run every time select node changes and select the node depending on state
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      const node = gridRef.current.api.getDisplayedRowAtIndex(selectNode);
      node.setSelected(true);
    }
  }, [selectNode]);
  const exportData = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <div>
        <button onClick={deselectAll}>deselect All</button>
      </div>
      <SelectRow />
      <AgGridReact
        pagination="true"
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="single"
        defaultColDef={defaultColDef}
      ></AgGridReact>
      <button onClick={() => exportData()}>Export Data</button>
    </div>
  );
}

export default App;
