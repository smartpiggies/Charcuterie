import * as types from "../constants";

const initialState = {
  tokenMap: []
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.TOKEN_DATA:
      return {
        ...state,
        tokenMap: actions.tokenData,
      };

    default:
      return state;
  }
}
