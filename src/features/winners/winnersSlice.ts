import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AsyncRaceAPI, CarPropsType, WinnerPropsType, WinnerTablePropsType} from '../../api/api';
import { current } from '@reduxjs/toolkit';
import {AppDispatch} from '../../store/store';

export const winnersSlice = createSlice({
        name: 'winners',
        initialState: {
            currentPage: 1,
            currentRace: [{
                id: 1,
                wins: 1,
                time: 10,
            }] as WinnerPropsType[],
            winners: [] as WinnerPropsType[],
            winnersPage: [] as WinnerPropsType[]
        },
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
            clearCurrentRaceParticipants: (state, action: PayloadAction) => {
                state.currentRace = [{
                    id: 1,
                    wins: 1,
                    time: 10,
                }]
                console.log(current(state));
            },
            createWinner: (state, action: PayloadAction<{
                id: number | undefined,
                wins: number,
                time: number,
            }>) => {
                const existWinnerIndex = state.winners.findIndex(winner =>
                    winner.id === action.payload.id)
                if (existWinnerIndex !== -1) {
                    state.winners[existWinnerIndex].wins += 1;
                    state.winners[existWinnerIndex].time = action.payload.time;
                } else {
                    state.winners.push(action.payload);
                }

                console.log(current(state));
            },
            fetchAllWinners: (state, action: PayloadAction<{
                winners: WinnerPropsType[],
            }>) => {
                state.winners = action.payload.winners;
                console.log(current(state));
            },
            fetchWinnersPage: (state, action: PayloadAction<{
                winners: WinnerPropsType[], page: number,
            }>) => {
                state.winnersPage = action.payload.winners;
                state.currentPage = action.payload.page;
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
export const fetchWinnersPageAsync = (page: number) => async (dispatch: any) => {
    try {
        const winners: WinnerPropsType[] = await AsyncRaceAPI.getWinnersPage(page);
        dispatch(fetchWinnersPage({winners, page}));
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
    createWinner,
    fetchAllWinners,
    sortCurrentRaceParticipants,
    clearCurrentRaceParticipants,
    fetchWinnersPage
} = winnersSlice.actions;
export const winnersReducer = winnersSlice.reducer