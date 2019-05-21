import * as types from "../constants";

export function showAllAuctions() {
  return {
    type: types.AUCTION_FILTERS_ALL
  };
}

export function showForSale() {
  return {
    type: types.AUCTION_FILTERS_FOR_SALE
  };
}

export function showNotForSale() {
  return {
    type: types.AUCTION_FILTERS_NOT_FOR_SALE
  };
}

export function showAllPutCall() {
  return {
    type: types.PUTCALL_FILTERS_ALL
  };
}

export function showOnlyPuts() {
  return {
    type: types.PUTCALL_FILTERS_PUT
  };
}

export function showOnlyCalls() {
  return {
    type: types.PUTCALL_FILTERS_CALL
  };
}

export function showAllExpiry() {
  return {
    type: types.EXPIRY_FILTERS_ALL
  };
}

export function showExpired() {
  return {
    type: types.EXPIRY_FILTERS_EXPIRED
  };
}

export function showNotExpired() {
  return {
    type: types.EXPIRY_FILTERS_NOT_EXPIRED
  };
}

export function showAllStyles() {
  return {
    type: types.STYLES_FILTERS_ALL
  };
}

export function showAmerican() {
  return {
    type: types.STYLES_FILTERS_AMERICAN
  };
}

export function showEuropean() {
  return {
    type: types.STYLES_FILTERS_EUROPEAN
  };
}
