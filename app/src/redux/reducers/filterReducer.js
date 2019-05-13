import * as types from "../constants";

const initialState = {
  isAuctionAll: true,
  isAuctionForSale: false,
  isAuctionNotForSale: false,
  isPutCallAll: true,
  isPutOnly: false,
  isCallOnly: false,
  isExpiryAll: true,
  isExpiredOnly: false,
  isNotExpired: false
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.AUCTION_FILTERS_ALL:
      return {
        ...state,
        isAuctionAll: true,
        isAuctionForSale: false,
        isAuctionNotForSale: false,
      }
    case types.AUCTION_FILTERS_FOR_SALE:
      return {
        ...state,
        isAuctionAll: false,
        isAuctionForSale: true,
        isAuctionNotForSale: false,
      }
    case types.AUCTION_FILTERS_NOT_FOR_SALE:
      return {
        ...state,
        isAuctionAll: false,
        isAuctionForSale: false,
        isAuctionNotForSale: true,
      }
    case types.PUTCALL_FILTERS_ALL:
      return {
        ...state,
        isPutCallAll: true,
        isPutOnly: false,
        isCallOnly: false,
      }
    case types.PUTCALL_FILTERS_PUT:
      return {
        ...state,
        isPutCallAll: false,
        isPutOnly: true,
        isCallOnly: false,
      }
    case types.PUTCALL_FILTERS_CALL:
      return {
        ...state,
        isPutCallAll: false,
        isPutOnly: false,
        isCallOnly: true,
      }
    case types.EXPIRY_FILTERS_ALL:
      return {
        ...state,
        isExpiryAll: true,
        isExpiredOnly: false,
        isNotExpired: false
      }
    case types.EXPIRY_FILTERS_EXPIRED:
      return {
        ...state,
        isExpiryAll: false,
        isExpiredOnly: true,
        isNotExpired: false
      }
    case types.EXPIRY_FILTERS_NOT_EXPIRED:
      return {
        ...state,
        isExpiryAll: false,
        isExpiredOnly: false,
        isNotExpired: true
      }

    default:
      return state
  }
}
