import React, { useContext, useRef, useEffect } from 'react';
import MainContext, { actions } from '../contexts';
import { ipcRenderer } from 'electron-renderer';
import { EVENTS } from '../consts/events';

function App() {
    const {store, dispatch} = useContext(MainContext);
    const imageRef = useRef(null);

    const to_gray = () => {
        dispatch({ type: actions.TO_GRAY, value: '' });
    };

    const reveive_list_files = (event, args) => {
        console.log(args);
    }

    useEffect(() => {
        ipcRenderer.on(EVENTS.RECEIVE_LIST_FILES, reveive_list_files);
    }, []);

    return <div>
        <div>
            <img id="coba" ref={imageRef} src={store.image}/>
        </div>
        <div>
            <button 
                onClick={() => to_gray()}>
                To Gray
            </button>
        </div>
    </div>
}

export default App;