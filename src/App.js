import { AgGridReact } from "ag-grid-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import SelectRow from "./components/SelectRow";
import { useSelector } from "react-redux";

function App() {
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
    }),
    []
  );

  // adding event listner to cells
  // const cellClickedListener = useCallback((e) => {
  //   console.log(e);
  // });

  // deselect all rows on Click
  const deselectAll = useCallback((e) => {
    gridRef.current.api.deselectAll();
  });
  const selectNode = useSelector((state) => state.RowReducer.nodeIndex);
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      console.log(selectNode);
      const node = gridRef.current.api.getDisplayedRowAtIndex(selectNode);
      console.log(node);
      node.setSelected(true);
    }
  }, [selectNode]);
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
        // onCellClicked={cellClickedListener}
      ></AgGridReact>
    </div>
  );
}

export default App;
