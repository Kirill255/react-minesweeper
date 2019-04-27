// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router";

import history from "../history";

import game from "./game";

export default combineReducers({ router: connectRouter(history), game });
