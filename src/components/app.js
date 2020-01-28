import React, { useContext, useRef } from 'react';
import MainContext, { actions } from '../contexts';

function App() {
    const {store, dispatch} = useContext(MainContext);
    const imageRef = useRef(null);

    const to_gray = () => {
        dispatch({ type: actions.TO_GRAY, value: '' });
    };

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