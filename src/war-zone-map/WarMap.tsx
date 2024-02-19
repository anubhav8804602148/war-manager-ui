import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw-src.css';
import { useDispatch, useSelector } from "react-redux";
import './css/WarMapStyle.css';
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { MapLayerSelectForm } from "./MapLayerSelectForm";
import { AlertBox } from "../app-manager/AlertBox";
import { actions } from "./store/WarZoneSlice";

export const WarMap = () => {
  const defaultTileLayerUrl = import.meta.env.VITE_API_DEFAULT_TILE_LAYER;
  const selectedMapLayer = useSelector((state: any) => state.warZoneReducer.selectedMapLayer);
  const selectedMapCentre = useSelector((state: any) => state.warZoneReducer.selectedMapCentre);
  const zoomLevel = useSelector((state: any) => state.warZoneReducer.zoomLevel);
  const dispatch = useDispatch();
  const { message, level } = useSelector((state: any) => state.warZoneReducer.logMessage);

  return (
    <div style={{ display: "flex" }}>
      <AlertBox message={message} level={level}></AlertBox>
      <MapLayerSelectForm />
      <MapContainer
        id="globalMapContainer"
        key={`${selectedMapCentre?.x}-${selectedMapCentre?.y}`}
        center={[
          selectedMapCentre?.y || 25.617511565073464,
          selectedMapCentre?.x || 85.07938351073251,
        ]}
        zoom={zoomLevel}
        style={{ height: window.innerHeight * 0.97, width: window.innerWidth }}
      >
        <TileLayer url={selectedMapLayer?.url || defaultTileLayerUrl} />
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={polygon => dispatch(actions.addToAllObjectsDrawn(polygon.layer.toGeoJSON()))}
            draw={{
              polyline: {
                icon: new L.DivIcon({
                  iconSize: new L.Point(8, 8),
                  className: "leaflet-div-icon leaflet-editing-icon"
                }),
                shapeOptions: {
                  guidelineDistance: 10,
                  color: "navy",
                  weight: 3
                }
              },
              rectangle: false,
              circlemarker: true,
              circle: true,
              polygon: true
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};
