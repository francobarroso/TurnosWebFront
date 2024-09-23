import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Turno from "../../types/Turno";

const DEFAULT_STATE = {
    turno: null
}

interface initialStateEntity {
    turno: Turno | null
};

const initialState: initialStateEntity = (() => {
    return DEFAULT_STATE;
})();

export const turnoSlice = createSlice({
    name: "turno",
    initialState,
    reducers: {
        setTurno: (state, action: PayloadAction<Turno | null>) => {
            const turno = action.payload;
            state.turno = turno;
        },
        clearTurno: (state) => {
            state.turno = null; // Reset turno to null
        }
    }
});

export const { setTurno, clearTurno } = turnoSlice.actions;
export default turnoSlice.reducer;