import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, Paper, PaperProps, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux"
import { actions } from "./store/WarZoneSlice";

export const NewGeoLayerForm = () => {
    const dialogOpen = useSelector((state: any) => state.warZoneReducer.newGeoLayerDialogOpen);
    const [layerName, setLayerName] = useState("");
    const allObjectsDrawn = useSelector((state: any) => state.warZoneReducer.allObjectsDrawn);
    const dispatch = useDispatch();

    const createNewGeoLayer = () => {
        axios.post("http://localhost:10000/war-manager-map-layer-service/mapLayerType/saveMapLayer", {
            geoLayerName: layerName,
            geoLayerPolygon: JSON.stringify(allObjectsDrawn)
        })
        .then(layerDataResponse => {
            dispatch(actions.setNewGeoLayerDialogOpen(false));
            dispatch(actions.setLogMessage({message: `New GeoLayer created id: ${layerDataResponse.data.geoLayerId} and name: ${layerDataResponse.data.geoLayerName}`, level: "success"}));
            setTimeout(() => dispatch(actions.setLogMessage({message: "", level: ""})), 5000);
        });
    }

    return <Dialog open={dialogOpen} PaperComponent={PaperComponent}>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{"New GeoLayer"}</DialogTitle>
        <DialogContent>
            <DialogContentText>{"Give a name to this map layer"}</DialogContentText>
            <FormControl sx={{paddingLeft: 5, paddingRight: 5, marginTop: 2}}>
                <TextField label="GeoLayer Name" value={layerName} onChange={(event) => setLayerName(event.target.value)}></TextField>
                <Button sx={{marginTop: 2, minHeight: 50, height: 50}} variant="contained" onClick={() => createNewGeoLayer()}>{"Submit"}</Button>
            </FormControl>
        </DialogContent>
    </Dialog>
}

const PaperComponent = (props: PaperProps) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}