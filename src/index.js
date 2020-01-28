import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import MainContext, { Reducer, Store } from './contexts';

function Main() {
    const [store, dispatch] = useReducer(Reducer, Store);

    return <MainContext.Provider
        value={{ store, dispatch }}
    >
        <App/>
    </MainContext.Provider>;
}

ReactDOM.render(<Main/>, document.getElementById('root'));