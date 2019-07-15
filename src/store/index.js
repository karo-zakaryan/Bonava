import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer/rootReducer";
import { createStore, applyMiddleware, compose } from "redux";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const devTools =
    process.env.NODE_ENV === "production"
        ? applyMiddleware(thunk)
        : composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducers,devTools);

export default store;
