import React from "react"
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from './src/store/reducers/rootReducer';

const store = createStore(rootReducer);

const RNRedux = () => (
    <Provider store = {store}>
        <App/>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);