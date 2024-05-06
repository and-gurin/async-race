import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CarPropsType} from '../../api/api';
import { current } from '@reduxjs/toolkit';

export type BestTimePropsType = {
    id: number;
    bestTime: number;
}

export const winnersSlice = createSlice({
        name: 'winners',
        initialState: {
            currentRace: [] as CarPropsType[],
            currentBestTime: [] as BestTimePropsType[],

        },
        reducers: {
            createCurrentRaceParticipants: (state, action: PayloadAction<{
                id: undefined | number, name: string, color: string, bestTime: number | undefined
            }>) => {
                state.currentRace.push(action.payload);
                console.log(current(state));
            },
            clearCurrentRaceParticipants: (state) => {
                state.currentRace = [];
                console.log(current(state));
            },

        }
    }
)

export const {
    createCurrentRaceParticipants, clearCurrentRaceParticipants
} = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer