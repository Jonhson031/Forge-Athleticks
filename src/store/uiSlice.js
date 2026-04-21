import { createSlice } from '@reduxjs/toolkit'

const initialState = { isBurgerMenuOpen: false, isMegaMenuOppen: false }

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        burgerMenuOpen(state) {
            state.isBurgerMenuOpen = !state.isBurgerMenuOpen
        },
        MegaMenuOpen(state) {
            state.isMegaMenuOppen = !state.isMegaMenuOppen
        },
    }
})

export const uiActions = uiSlice.actions;