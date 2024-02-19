import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import UserIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../war-zone-map/store/WarZoneSlice";
import { hasPrivilege } from "../services/userService";

const AllAppsGrid = () => {
    const dispatch = useDispatch();
    const showAllAvailableApps = useSelector((state: any) => state.warZoneReducer.showAllAvailableAppsDialog);
    
    const gotoLocation = (location: string) => {
        window.open(location, "_blank")
    }

    const userManagementOption = () => {
        if(hasPrivilege("RO_USER_MANAGEMENT_ADMIN")){
            return <Button onClick={() => gotoLocation("/user-management")} title="User Management"><AdminPanelSettingsIcon></AdminPanelSettingsIcon></Button>
        }
    }

    return <Dialog open={showAllAvailableApps}>
                <IconButton sx={{position: "absolute", right: "8px", fontSize: 12}} onClick={() => dispatch(actions.setShowAllAvailableAppsDialog(false))}>
                    X
                </IconButton>
                <DialogContent>
                    <Button onClick={() => gotoLocation("/login")} title="Login"><UserIcon/></Button>
                    <Button onClick={() => gotoLocation("/map")} title="Map"><MapIcon/></Button>
                    {userManagementOption()}
                </DialogContent>
            </Dialog>
}

export default AllAppsGrid;