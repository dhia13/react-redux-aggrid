import { INC, DEC } from "../Types";
const initialState = {
  nodeIndex: 0,
};
export default function RowReducer(state = initialState, action) {
  switch (action.type) {
    case INC:
      return {
        nodeIndex: state.nodeIndex + 1,
      };
    case DEC:
      return {
        nodeIndex: state.nodeIndex - 1,
      };
    default:
      return state;
  }
}
