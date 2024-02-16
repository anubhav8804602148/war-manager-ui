import { createSlice } from '@reduxjs/toolkit';

const warZoneSlice = createSlice({
  name: 'warZone',
  initialState: {
    selectedMapLayer: {url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", label: "humanitarian"},
    selectedMapCentre: {},
    mapClassActivated: "",
    mapMarkers: [],
    sideNavActive: "",
    zoomLevel: 11,
    logMessage: {message: "", level: ""},
    allObjectsDrawn: {
      type: "FeatureCollection",
      features: []
    },
    newGeoLayerDialogOpen: false,
    showAllAvailableLayers: false
  },
  reducers: {
    setSelectedMapLayer: (state, action) => {
      state.selectedMapLayer = action.payload;
    },
    setSelectedMapCentre: (state, action) => {
      state.selectedMapCentre = action.payload;
    },
    setMapClassActivated: (state, action) => {
      state.mapClassActivated = action.payload;
    },
    setMapMarkers: (state, action) => {
      state.mapMarkers = action.payload;
    },
    setSideNavActive: (state, action) => {
      state.sideNavActive = action.payload;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
    setLogMessage: (state, action) => {
      state.logMessage = action.payload;
    },
    addToAllObjectsDrawn: (state: any, action: any) => {
      state.allObjectsDrawn.features = [...state.allObjectsDrawn.features, action.payload];
      state.allObjectsDrawn = {...state.allObjectsDrawn}
    },
    setNewGeoLayerDialogOpen: (state, action) => {
      state.newGeoLayerDialogOpen = action.payload;
    },
    setShowAllAvailableLayers: (state, action) => {
      state.showAllAvailableLayers = action.payload;
    }
  },
});

export const { actions, reducer} = warZoneSlice;
export default warZoneSlice.reducer;
