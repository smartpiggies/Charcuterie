import * as types from "../constants";

export function setTokenData(data) {
  return {
    type: types.TOKEN_DATA,
    tokenData : data
  }
}
