import { SET_FORGE_TOKEN } from "../actionTypes/actionTypes";

const setForgeToken = forgeToken => {
  return {
    type: SET_FORGE_TOKEN,
    forgeToken
  };
};

export default setForgeToken;
