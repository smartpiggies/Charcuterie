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
        isAuctionAll: !state.isAuctionAll
      }
    case types.AUCTION_FILTERS_FOR_SALE:
      return {
        ...state,
        isAuctionForSale: !state.isAuctionForSale
      }
    case types.AUCTION_FILTERS_NOT_FOR_SALE:
      return {
        ...state,
        isAuctionNotForSale: !state.isAuctionNotForSale
      }
    case types.PUTCALL_FILTERS_ALL:
      return {
        ...state,
        isPutCallAll: !state.isPutCallAll
      }
    case types.PUTCALL_FILTERS_PUT:
      return {
        ...state,
        isPutOnly: !state.isPutOnly
      }
    case types.PUTCALL_FILTERS_PUT:
      return {
        ...state,
        isCallOnly: !state.isCallOnly
      }
    case types.EXPIRY_FILTERS_ALL:
      return {
        ...state,
        isExpiryAll: !state.isExpiryAll
      }
    case types.EXPIRY_FILTERS_EXPIRED:
      return {
        ...state,
        isExpiredOnly: !state.isExpiredOnly
      }
    case types.EXPIRY_FILTERS_NOT_EXPIRED:
      return {
        ...state,
        isNotExpired: !state.isNotExpired
      }

    default:
      return state
  }
}
