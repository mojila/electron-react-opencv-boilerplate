import React from 'react';
import lena from '../assets/images/lena.jpg';
import cv from '../utils/opencv-4.2.0';
import { ipcRenderer } from 'electron-renderer';
import { EVENTS } from '../consts/events';
import Jimp from 'jimp';
import { Buffer } from 'buffer';

const MainContext = React.createContext();

export const actions = {
    SET_IMAGE: 'set_image',
    TO_GRAY: 'to_gray'
};

export const Store = {
    image: lena
};

async function to_jimp(raw_image) {
    let image = await Jimp.read(raw_image);

    return image;
}

function list_files() {
    ipcRenderer.send(EVENTS.LIST_FILES, 'give me list files');
}

async function to_gray() {
    let image = await to_jimp(lena);
    let src = cv.matFromImageData(image.bitmap);
    let dst = new cv.Mat();

    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

    console.log(dst);

    // src.delete();
    // dst.delete();

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