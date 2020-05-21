import CoreApiClient from "./CoreApiClient";
import reducer from "./reducer";
import { KEY_ROOT as KEY_REDUCER } from "./storeKeys";
import * as selectors from "./selectors";
import * as actionCreators from "./actionCreators";

const logCatch = (e: Object) => {
  console.error(e);
};

export {
  CoreApiClient,
  logCatch,
  reducer,
  KEY_REDUCER,
  selectors,
  actionCreators,
}
