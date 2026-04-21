import { configureStore } from '@reduxjs/toolkit'

import { uiSlice } from './uiSlice.js';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
    }
})

