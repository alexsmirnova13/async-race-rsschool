import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import type { PayloadAction } from '@reduxjs/toolkit';
import ICar, { IWinner } from '../../interfaces/Car';
import { getRandomCarName, getRandomColor } from '../../utils/randomizer';

enum CarTypes {
  GET = 'CARS/GET',
  CREATE = 'CARS/CREATE_CAR',
  DELETE = 'CARS/DELETE_CAR',
  UPDATE = 'CARS/UPDATE_CAR',
  LAUNCH_CAR = 'CARS/LAUNCH_CAR',
  LAUNCH_CARS = 'CARS/LAUNCH_CARS',
  DRIVE_CAR = 'CARS/DRIVE_CAR',
  DRIVE = 'CARS/DRIVE_CARS',
  RESET = 'CARS/RESET_CARS',
  GET_WINNERS = 'CARS/GET_WINNERS',
  SET_WINNER = 'CARS/SET_WINNER',
  START_RACE = 'CARS/START_RACE',
  START_TIMER = 'CARS/START_TIMER',
  END_TIMER = 'CARS/END_TIMER',
  CAR_FINISHED = 'CARS/CAR_FINISHED',
  GENERATE_CARS = 'CARS/GENERATE_CARS',
  SET_LOADING = 'CARS/SET_LOADING'
}

const carApiUrl = 'https://reminiscent-abalone-loganberry.glitch.me';
// const carApiUrl = 'http://localhost:3000';
const garageApi = `${carApiUrl}/garage`;
const engineApi = `${carApiUrl}/engine`;
const winnersApi = `${carApiUrl}/winners`;

export const setLoading = createAsyncThunk(
  CarTypes.SET_LOADING,
  async (bool:boolean) => bool,
);

export const getCars = createAsyncThunk(
  CarTypes.GET,
  async () => {
    const resp = await axios.get(garageApi).then((r) => r.data);
    return resp;
  },
);

export const getWinners = createAsyncThunk(
  CarTypes.GET_WINNERS,
  async () => {
    const resp = await axios.get(winnersApi).then((r) => r.data);
    return resp;
  },
);

export const resetCars = createAsyncThunk(
  CarTypes.RESET,
  async (ids: number[]) => {
    const resp = await Promise.all(ids.map(async (u) => {
      const patchResp = await axios.patch(engineApi, null, {
        params: { id: u, status: 'started' },
      });
      return patchResp.status === 200 ? u : null;
    }));
    return resp;
  },
);

export const createCar = createAsyncThunk(
  CarTypes.CREATE,
  async ({ name, color }:{ name:string, color:string }) => {
    const resp = await axios.post(garageApi, {
      name,
      color,
    }).then((r) => r.data);
    return resp;
  },
);

export const deleteCar = createAsyncThunk(
  CarTypes.DELETE,
  async (id:number) => {
    const status = await axios.delete(`${garageApi}/${id}`).then((r) => r.status);
    return status === 200 ? id : null;
  },
);

export const updateCar = createAsyncThunk<ICar, { name:string, color:string, id:number }>(
  CarTypes.UPDATE,
  async ({ name, color, id }) => axios.put(`${garageApi}/${id}`, { name, color }).then((r) => r.data),
);

export const driveCar = createAsyncThunk(
  CarTypes.DRIVE_CAR,
  async (id:number) => {
    const status = 'drive';
    const resp = await axios.patch(engineApi, null, {
      params: {
        id, status,
      },
    }).then(() => ({ success: true })).catch(() => ({ success: false }));
    return {
      id,
      status: resp.success ? null : 'broken',
    };
  },
);

export const launchCar = createAsyncThunk(
  CarTypes.LAUNCH_CAR,
  async (id:number, { dispatch, getState }:{ getState:any, dispatch: any }) => {
    const state = getState();
    if (!state.counter.start) {
      dispatch(startTimer())
    }
    dispatch(setLoading(true))
    const status = 'started';
    const resp = await axios.patch(engineApi, null, {
      params: {
        id, status,
      },
    });
    dispatch(driveCar(id));
    if (resp.status === 200) {
      return {
        ...resp.data,
        id,
        status,
      };
    }
    return null;
  },
);

export const startTimer = createAsyncThunk(
  CarTypes.START_TIMER,
  async () => Date.now(),
);

export const endTimer = createAsyncThunk(
  CarTypes.END_TIMER,
  async () => Date.now(),
);

export const startRace = createAsyncThunk(
  CarTypes.START_RACE,
  async (ids:number[], { dispatch }) => {
    dispatch(setLoading(true));
    dispatch(startTimer());
    ids.forEach((u) => {
      dispatch(launchCar(u));
    });
  },
);

export const setWinner = createAsyncThunk(
  CarTypes.SET_WINNER,
  async ({ id, time }:{ id:number, time:number }, { dispatch }) => {
    const winnerToCreate = {
      id,
      wins: 1,
      time,
    };
    const createdWinner = await axios.post(winnersApi, winnerToCreate)
      .then((r) => r.data).catch(() => null);
    if (!createdWinner) {
      const winnerInfo = await axios.get(`${winnersApi}/${id}`).then((r) => r.data).catch(() => null);
      const updatedWinner = await axios.put(`${winnersApi}/${id}`, {
        wins: winnerInfo.wins + 1,
        time: winnerInfo.time >= time ? time : winnerInfo.time,
      }).then((r) => r.data);
      dispatch(endTimer());
      return updatedWinner;
    }
    dispatch(endTimer());
    return createdWinner;
  },
);

export const carFinished = createAsyncThunk(
  CarTypes.CAR_FINISHED,
  async (id:number, { getState, dispatch }:{ getState:any, dispatch: any }) => {
    console.log('AWDAWDWAWD')
    const state = getState();
    const finishTime = Date.now();
    if (!state.counter.winnerId) {
      dispatch(setWinner({ id, time: (finishTime - state.counter.start) / 1000 }));
    }
    return {
      id,
      finishTime,
    };
  },
);

export const generateCars = createAsyncThunk(
  
  CarTypes.GENERATE_CARS,
  async () => {
    const genCars = [];
    while (genCars.length < 100) {
      genCars.push({
        name: getRandomCarName(),
        color: getRandomColor(),
      });
    }
    console.log(genCars)
    const status = await Promise.all(genCars.map((u) => axios.post(garageApi, {
      name: u.name,
      color: u.color,
    }).then((r) => r.data)));
    
    return status;
  },
);

export interface CounterState {
  carToUpdate: number | null;
  cars: ICar[];
  winners: IWinner[];
  winnerId : number | null;
  winnerTime : number | null;
  start: number | null;
  end: number | null;
  isLoading: boolean;
}

const initialState: CounterState = {
  carToUpdate: null,
  cars: [],
  winners: [],
  winnerId: null,
  winnerTime: null,
  start: null,
  end: null,
  isLoading: false,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCarToUpdate: (state, action: PayloadAction<number | null>) => {
      state.carToUpdate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.fulfilled, (state, action) => {
      state.cars = action.payload;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.cars = state.cars.concat(action.payload);
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((u) => u.id !== action.payload);
      state.winners = state.winners.filter((u) => u.id !== action.payload);
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.cars = state.cars.map((u) => (u.id === action.payload.id ? action.payload : u));
      state.carToUpdate = null;
    });
    builder.addCase(launchCar.fulfilled, (state, action) => {
      state.cars = state.cars.map((u) => (u.id === action.payload.id
        ? { ...u, ...action.payload }
        : u));
    });
    builder.addCase(resetCars.fulfilled, (state, action) => {
      const carIdsToReset = action.payload;
      state.cars = state.cars.map((u) => {
        if (carIdsToReset.includes(u.id)) {
          return {
            ...u,
            velocity: undefined,
            distance: undefined,
            finishTime: undefined,
            status: 'stopped',
          };
        }
        return u;
      });
      state.start = undefined;
      state.end = undefined;
      state.winnerId = undefined;
      state.winnerTime = undefined;
      state.isLoading = false;
    });
    builder.addCase(driveCar.fulfilled, (state, action) => {
      const { status } = action.payload;
      state.cars = state.cars.map((u) => (u.id === action.payload.id
        ? { ...u, status: status || u.status }
        : u));
    });
    builder.addCase(carFinished.fulfilled, (state, action) => {
      const { id, finishTime } = action.payload;
      state.cars = state.cars.map((u) => (u.id === id
        ? { ...u, status: 'finished', finishTime: (finishTime - state.start) / 1000 }
        : u));
      if (!state.winnerId) {
        state.winnerId = id;
        state.winnerTime = (Date.now() - state.start) / 1000;
      }
    });
    builder.addCase(getWinners.fulfilled, (state, action) => {
      state.winners = action.payload;
    });
    builder.addCase(startTimer.pending, (state) => {
      if (!state.start) {
        state.start = Date.now();
      }
    });
    builder.addCase(endTimer.pending, (state) => {
      if (!state.end) {
        state.end = Date.now();
      }
    });
    builder.addCase(endTimer.fulfilled, (state, action) => {
      state.end = action.payload;
    });
    builder.addCase(generateCars.fulfilled, (state, action) => {
      state.cars = state.cars.concat(action.payload);
    });
    builder.addCase(setLoading.pending, (state, action) => {
      state.isLoading = action.meta.arg;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCarToUpdate } = counterSlice.actions;

export default counterSlice.reducer;
