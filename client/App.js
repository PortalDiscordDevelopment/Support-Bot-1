import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from "./src/store";
import RootNavigator from "./src/RootNavigator";
import 'antd/dist/antd.css';
import 'react-chat-elements/dist/main.css';

const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
