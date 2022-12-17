import { INC, DEC } from "../Types";
export const IncNodeIndex = () => async (dispatch) => {
  console.log("inc action");
  dispatch({
    type: INC,
  });
};
export const DecNodeIndex = () => async (dispatch) => {
  console.log("dec action");
  dispatch({
    type: DEC,
  });
};
