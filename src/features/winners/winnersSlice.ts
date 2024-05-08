import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncRaceAPI, WinnerPropsType} from '../../api/api';
import { current } from '@reduxjs/toolkit';
import {AppDispatch} from '../../store/store';

export const winnersSlice = createSlice({
        name: 'winners',
        initialState: {
            currentRace: [] as WinnerPropsType[],
            winners: [] as WinnerPropsType[],},
        reducers: {
            createCurrentRaceParticipants: (state, action: PayloadAction<{
                id: number | undefined,
                time: number,
                wins: number
            }>) => {
                state.currentRace.push(action.payload);
            },
            sortCurrentRaceParticipants: (state, action: PayloadAction) => {
                state.currentRace.sort((a, b) => {
                    return a.time! - b.time!
                });
                console.log(current(state));
            },
            clearCurrentRaceParticipants: (state) => {
                state.currentRace = [];
            },
            createWinner: (state, action: PayloadAction<{
                id: number | undefined,
                time: number,
                wins: number
            }>) => {
                state.winners.push(action.payload);
                console.log(current(state));
            },
            fetchAllWinners: (state, action: PayloadAction<{
                winners: WinnerPropsType[],
            }>) => {
                state.winners = action.payload.winners;
                console.log(current(state));
            },
        }
    }
)

export const createWinnerAsync = (winnerData: {
    id: number | undefined,
    time: number,
    wins: number }) => async (dispatch: AppDispatch) => {
    try {
        await AsyncRaceAPI.postWinner(winnerData);
        dispatch(createWinner(winnerData));
    } catch (error) {
        console.error(error);
    }
};
export const fetchAllWinnersAsync = () => async (dispatch: any) => {
    try {
        const winners: WinnerPropsType[] = await AsyncRaceAPI.getWinners();
        dispatch(fetchAllWinners({winners}));
    } catch (error) {
        console.error(error);
    }
};

export const {
    createCurrentRaceParticipants,
    clearCurrentRaceParticipants,
    createWinner,
    fetchAllWinners,
    sortCurrentRaceParticipants
} = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer