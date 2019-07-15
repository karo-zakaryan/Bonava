import { combineReducers } from "redux";
import { snackbarReducer as snackbar } from "react-redux-snackbar";
import auth from "../authReducer/authReducer";
import type from "../typeReducer/typeReducer";
import tree from "../treeReducer/treeReducer";
import ridata from "../dataReducer/dataReducer";

export default combineReducers({ auth, type, tree, ridata, snackbar });
