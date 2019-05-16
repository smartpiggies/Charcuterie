import * as types from "../constants";

const initialState = {
  currentBlock: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CURRENT_BLOCK:
      return {
        ...state,
        currentBlock: actions.block
      };

    default:
      return state;
  }
}
