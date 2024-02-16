// store.js
import { configureStore } from '@reduxjs/toolkit';
import warZoneReducer from './WarZoneSlice';

const warZoneStore = configureStore({
  reducer: {
    warZoneReducer: warZoneReducer,
  },
});

export default warZoneStore;
