import * as types from "../constants";

export function setCurrentBlock(block) {
    return {
      type  : types.CURRENT_BLOCK,
      block : block
    }
}
