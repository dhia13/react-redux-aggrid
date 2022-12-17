import { useDispatch, useSelector } from "react-redux";
import { IncNodeIndex, DecNodeIndex } from "../redux/Actions/rowActions";
const SelectRow = () => {
  const selectNode = useSelector((state) => state.RowReducer.nodeIndex);
  const dispatch = useDispatch();
  const incNodeIndex = () => {
    dispatch(IncNodeIndex());
  };
  const decNodeIndex = () => {
    dispatch(DecNodeIndex());
  };
  return (
    <div style={{ display: "flex" }}>
      <button onClick={incNodeIndex}>inc</button>
      <p>{selectNode}</p>
      <button onClick={decNodeIndex}>dec</button>
    </div>
  );
};

export default SelectRow;
