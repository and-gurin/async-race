import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CarPropsType} from '../../api/api';
import { current } from '@reduxjs/toolkit';

export const winnersSlice = createSlice({
        name: 'winners',
        initialState: {
            currentRace: [] as CarPropsType[],
            currentBestTime: {} as CarPropsType,
            currentWorstTime: {} as CarPropsType,

        },
        reducers: {
            createCurrentRaceParticipants: (state, action: PayloadAction<{
                id: undefined | number, name: string, color: string, bestTime: number | undefined
            }>) => {
                state.currentRace.push(action.payload);
                console.log(current(state));
            },
            checkCurrentBestTime: (state) => {
                const sort = state.currentRace.sort((a, b) => {
                    return a.bestTime! - b.bestTime!
                });
                state.currentBestTime = sort[0]
                state.currentWorstTime = sort[state.currentRace.length - 1]
                console.log(current(state));
            },
            clearCurrentRaceParticipants: (state) => {
                state.currentRace = [];

            },

        }
    }
)

export const {
    createCurrentRaceParticipants,
    clearCurrentRaceParticipants,
    checkCurrentBestTime
} = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer