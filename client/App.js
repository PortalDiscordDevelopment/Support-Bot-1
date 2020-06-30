/*
 *   Copyright (c) 2020 Lucien Blunk-Lallet

 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.

 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
