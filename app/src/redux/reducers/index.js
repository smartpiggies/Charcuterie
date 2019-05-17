import { combineReducers } from "redux";

import sidebar from "./sidebarReducers";
import layout from "./layoutReducer";
import theme from "./themeReducer";
import filters from "./filterReducer"
import chainUtils from "./chainReducer"
import tokenMapping from "./tokenReducer"

import { reducer as toastr } from "react-redux-toastr";

export default combineReducers({
  sidebar,
  layout,
  theme,
  toastr,
  filters,
  chainUtils,
  tokenMapping
});
