import { INC, DEC } from "../Types";
export const IncNodeIndex = () => async (dispatch) => {
  dispatch({
    type: INC,
  });
};
export const DecNodeIndex = () => async (dispatch) => {
  dispatch({
    type: DEC,
  });
};
