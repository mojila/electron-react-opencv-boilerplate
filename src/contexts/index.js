import React from 'react';
import lena from '../assets/images/lena.jpg';
import cv from '../utils/opencv-4.2.0';
import { ipcRenderer } from 'electron-renderer';
import { EVENTS } from '../consts/events';

const MainContext = React.createContext();

export const actions = {
    SET_IMAGE: 'set_image',
    TO_GRAY: 'to_gray'
};

export const Store = {
    image: lena
};

function list_files() {
    ipcRenderer.send(EVENTS.LIST_FILES, 'give me list files');
}

function to_gray() {
    console.log(cv);
    list_files();
}

export const Reducer = (state, action) => {
    switch(action.type) {
        case actions.SET_IMAGE:
            return {...state, image: action.value};
        case actions.TO_GRAY:
            to_gray();
            return state;
        default:
            return state;
    }
}

export default MainContext;