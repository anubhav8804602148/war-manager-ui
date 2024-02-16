import { Autocomplete, Box, TextField } from "@mui/material";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "./store/WarZoneSlice";

export const LocationSearchTextField = () => {
    const provider = new OpenStreetMapProvider();
    const dispatch = useDispatch();

    const [searchResults, setSearchResults] = useState([]);
    const handleSearchTextChange = (searchText: any) => {
        provider.search({ query: searchText }).then((addressResponse: any) => setSearchResults(addressResponse));
    }

    const getDropdownSugestions = () => {
        return <Autocomplete
            className="auto-complete-address-search"
            size="small"
            getOptionLabel={(value: any) => value.label || ""}
            options={searchResults || []}
            loading={true}
            onInputChange={(_, value) => {
                handleSearchTextChange(value);
            }}
            onChange={(_,value) => dispatch(actions.setSelectedMapCentre({...value}))}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search"
                    InputProps={{...params.InputProps}}
                />
            )}
        />
    }

    return <div style={{ position: "fixed", zIndex: 9999, border: "1px solid grey", backgroundColor: "white", marginLeft: 100 }}>
        <Box sx={{ minWidth: 200 }}>
            {getDropdownSugestions()}
        </Box>
    </div>;
}