import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./store/WarZoneSlice";
import axios from "axios";
import './css/WarMapStyle.css';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import LayerIcon from '@mui/icons-material/Layers';
import { LocationSearchTextField } from "./LocationSearchTextField";
import { NewGeoLayerForm } from "./NewGeoLayerForm";
import AppsIcon from '@mui/icons-material/Apps';
import AllAppsGrid from "../app-manager/AllAppsGrid";

export const MapLayerSelectForm = () => {

    const dividerStyle = {
        height: 3,
        background: "#444444",
        ml: -0.5,
        mr: 0.5,
        mb: 1
    };
    const [allMapLayers, setAllMapLayers] = useState([] as any);
    const showAllAvailableLayers = useSelector((state: any) => state.warZoneReducer.showAllAvailableLayers);
    const allObjectsDrawn = useSelector((state: any) => state.warZoneReducer.allObjectsDrawn);
    const showAllAvailableApps = useSelector((state: any) => state.warZoneReducer.showAllAvailableAppsDialog);
    const selectedMapLayer = useSelector((state: any) => state.warZoneReducer.selectedMapLayer);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(import.meta.env.VITE_API_MAP_LAYERS_GET_ALL_ACTIVE_LAYERS, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(activeLayerResponse => setAllMapLayers(activeLayerResponse.data))
            .catch((error: any) => {
                if (error.response.status == 401) {
                    dispatch(actions.setLogMessage({ message: <div style={{ fontSize: 16 }}>{"You are not logged in yet."}<a href='/login'>Login?</a></div>, level: "error" }));
                }
                else {
                    dispatch(actions.setLogMessage({ message: `Error while fetching all map layers ${error.message}`, level: "error" }));
                }
                setTimeout(() => dispatch(actions.setLogMessage({ message: "", level: "" })), 5000);
                sessionStorage.removeItem("authenticationheader");
            });
    }, []);

    const isLoggedIn = () => {
        return sessionStorage.getItem("authenticationheader");
    }

    const handleMapLayerChange = (layerName: any) => {
        if (sessionStorage.getItem("authenticationheader")) {
            dispatch(actions.setSelectedMapLayer({ url: allMapLayers.filter((mapLayer: any) => mapLayer.mapLayerName == layerName)[0].mapLayerUrl, label: layerName }));
        }
        else {
            window.location.href = "/login";
        }
    }

    const showCreateNewGeoLayerDialog = () => {
        if(allObjectsDrawn?.features?.length) dispatch(actions.setNewGeoLayerDialogOpen(true));
        else {
            dispatch(actions.setLogMessage({message: "No shape drawn yet", level: "info"}));
            setTimeout(() => dispatch(actions.setLogMessage({message: "", level: ""})), 5000);
        }
    }

    const loginOrLogout = () => {
        axios.get(import.meta.env.VITE_API_AUTHENTICATION_LOGOUT).then(_ => window.location.href = "/login");
    }

    const handleShowAllAvailableLayers = () => {
        dispatch(actions.setShowAllAvailableLayers(!showAllAvailableLayers));
    }

    const getLoginOrLogoutIcon = () => {
        if (isLoggedIn()) {
            return <LogoutIcon></LogoutIcon>
        }
        return <LoginIcon></LoginIcon>
    }

    const allActiveLayersCheckBoxForm = () => {
        if (showAllAvailableLayers) {
            return <Dialog open={showAllAvailableLayers} sx={{border: "none"}}>
                <DialogTitle>All Layers</DialogTitle>
                <DialogContent>
                    <form>
                        <fieldset defaultValue={selectedMapLayer.label} style={{border: "none", padding: "10px 40px 10px 40px", fontSize: "20px"}} id="mapLayerName" onChange={(event: any) => handleMapLayerChange(event.target.value)}>
                            {allMapLayers.map((layer: any) => <>
                                <label key={layer.mapLayerName}>
                                    <input 
                                        type="radio" 
                                        value={layer.mapLayerName} 
                                        name="mapLayerName" 
                                        checked={selectedMapLayer.label===layer.mapLayerName}
                                        key={layer.mapLayerName}></input>
                                    {layer.mapLayerName}
                                </label><br></br></>)}
                        </fieldset>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => {dispatch(actions.setShowAllAvailableLayers(false))}}>Done</Button>
                </DialogActions>
            </Dialog>
        }
    }

    const showAllAvailableAppsDialog = () => {
        dispatch(actions.setShowAllAvailableAppsDialog(true))
    }

    const allAvailableApps = () => {
        if(showAllAvailableApps){
            return <AllAppsGrid></AllAppsGrid>
        }
    }

    return <FormControl sx={{ m: 0, p: 0, minWidth: 0 }}>
        <img src="war-manager-icon.png" alt="" width={40} style={{ marginBottom: 20, marginLeft: -10 }} />
        <Divider sx={dividerStyle} variant="fullWidth"></Divider>
        <Button size={"small"} sx={{ m: 0, p: 1, marginRight: 1, marginBottom: 1, minWidth: 0, color: "grey" }} onClick={() => handleShowAllAvailableLayers()} title="Show All Layers"><LayerIcon /></Button>
        <Divider sx={dividerStyle} variant="fullWidth"></Divider>
        <Button size={"small"} sx={{ m: 0, p: 1, marginRight: 1, marginBottom: 1, minWidth: 0, color: "grey" }} onClick={() => showCreateNewGeoLayerDialog()} title="Save Current Polygons"><SaveIcon /></Button>
        <LocationSearchTextField />
        <Button size={"small"} sx={{ m: 0, p: 1, marginRight: 1, marginBottom: 1, minWidth: 0, color: "grey" }} onClick={() => loginOrLogout()} title="Logout">{getLoginOrLogoutIcon()}</Button>
        <NewGeoLayerForm />
        {allActiveLayersCheckBoxForm()}
        <Button size={"small"} sx={{ m: 0, p: 1, marginRight: 1, marginBottom: 1, minWidth: 0, color: "grey" }} onClick={() => showAllAvailableAppsDialog()} title="Apps"><AppsIcon></AppsIcon></Button>
        {allAvailableApps()}
    </FormControl>
}