import { Button, FormControl, Input } from '@mui/material';
import UserManagementFooter from './UserManagementFooter';
import UserManagementHeader from './UserManagementHeader';
import './css/userManagement.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actions } from '../war-zone-map/store/WarZoneSlice';
const UserManagement = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [activeUserDetail, setActiveUserDetail] = useState({} as UserDetails);
    const [showNewUserForm, setShowNewUserForm] = useState(false);
    const [newUserDetails, setNewUserDetails] = useState({} as UserDetails);
    const dispatch = useDispatch();

    const labelStyle = {
        fontSize: 12
    }

    const fetchAllUsers = () => {
        axios
            .get(import.meta.env.VITE_API_GET_ALL_USERDETAILS)
            .then(userDetailsListResponse => setAllUsers(userDetailsListResponse.data));
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const showUserDetails = (userDetails: any) => {
        setActiveUserDetail(userDetails);
        setShowNewUserForm(false);
    }

    const updateUserDetails = (userDetails: any) => {
        axios.post(import.meta.env.VITE_APP_UPDATE_USER_DETAIL, userDetails)
            .then(_ => fetchAllUsers());
    }

    const createNewUserDetails = (userDetails: any) => {
        if(userDetails.user.password!==userDetails.user.confirmPassword) {
            dispatch(actions.setLogMessage({message: "Confirm Password should be same as Password", level: "info"}));
            setTimeout(() => dispatch(actions.setLogMessage({message: "", level: ""})), 5000);
        }
        axios.post(import.meta.env.VITE_APP_UPDATE_USER_DETAIL, userDetails)
            .then(_ => fetchAllUsers());
    }

    const updateParamsForUserDetails = (userDetailsParams: any) => {
        setActiveUserDetail({
            ...activeUserDetail,
            ...userDetailsParams
        })
    }

    const updateParamsForNewUserDetails = (newUserDetailsParam: any) => {
        setNewUserDetails({
            ...newUserDetails,
            ...newUserDetailsParam
        })
    }

    const updateParamsForNewUser = (newUserParam: any) => {
        setNewUserDetails({
            ...newUserDetails, 
            user: {
                ...newUserDetails.user,
                ...newUserParam
            }
        })
    }

    const updateParamsForUser = (userParam: any) => {
        setActiveUserDetail({
            ...activeUserDetail,
            user: {
                ...activeUserDetail.user,
                ...userParam
            }
        })
    }

    const activeUserRoles = () => {
        return <div style={{display: "flex", flexDirection: "column"}}>
            {activeUserDetail?.account?.roles?.map(role => <span key={role.roleId} className="active-role">{role.roleName}</span>)}
            <span style={{color: "green"}}><Button>+Add Role</Button></span>
        </div>
        
    }

    const getActiveUserUpdateForm = () => {
        if (activeUserDetail.user?.username && !showNewUserForm) {
            return <FormControl fullWidth>
                <label style={labelStyle}>Username:</label><Input value={activeUserDetail.user?.username} disabled></Input>
                <label style={labelStyle}>First Name:</label><Input value={activeUserDetail.firstName} onChange={(event) => updateParamsForUserDetails({ firstName: event.target.value })}></Input>
                <label style={labelStyle}>Last Name:</label><Input value={activeUserDetail.lastName} onChange={(event) => updateParamsForUserDetails({ lastName: event.target.value })}></Input>
                <label style={labelStyle}>Email:</label><Input value={activeUserDetail.user?.email} onChange={(event) => updateParamsForUser({ email: event.target.value })}></Input>
                <label style={labelStyle}>Roles</label>{activeUserRoles()}
                <Button type='submit' variant='contained' onClick={() => updateUserDetails(activeUserDetail)}>Update</Button>
            </FormControl>
        }
    }

    const showNewUserDetailsForm = () => {
        if (showNewUserForm) {
            return <FormControl fullWidth style={{overflowY: "scroll", maxHeight: 400, minHeight: 400, height: 400}}>
                <label style={labelStyle}>Username:</label><Input value={newUserDetails.user?.username} onChange={(event) => updateParamsForNewUser({ username: event.target.value })}></Input>
                <label style={labelStyle}>Email:</label><Input value={newUserDetails.user?.email} onChange={(event) => updateParamsForNewUser({ email: event.target.value })}></Input>
                <label style={labelStyle}>First Name:</label><Input value={newUserDetails.firstName} onChange={(event) => updateParamsForNewUserDetails({ firstName: event.target.value })}></Input>
                <label style={labelStyle}>Last Name:</label><Input value={newUserDetails.lastName} onChange={(event) => updateParamsForNewUserDetails({ lastName: event.target.value })}></Input>
                <label style={labelStyle}>Password:</label><Input type="password" value={newUserDetails.user?.password} onChange={(event) => updateParamsForNewUser({ password: event.target.value })}></Input>
                <label style={labelStyle}>Confirm Password:</label><Input type="password" onChange={(event) => newUserDetails.user.confirmPassword = event.target.value}></Input>
                <Button type='submit' variant='contained' onClick={() => createNewUserDetails(newUserDetails)}>Update</Button>
            </FormControl>
        }
    }

    return <>
        <UserManagementHeader />
        <div className="container">
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
                <Input type='text' sx={{ marginBottom: 5 }}></Input>
                <Button key={"newUser"} style={{ textAlign: "left", justifyContent: "left", fontSize: 16 }} onClick={() => setShowNewUserForm(true)}>{"+ New User"}</Button>
                {allUsers.map((user: any) => <Button key={user.user.username} style={{ textAlign: "left", justifyContent: "left", fontSize: 16 }} onClick={() => showUserDetails(user)}>{user.user.username}</Button>)}
            </div>
            <div className="card" style={{ maxHeight: 400, minHeight: 400, height: 400}}>
                {getActiveUserUpdateForm()}
                {showNewUserDetailsForm()}
            </div>
        </div>
        <UserManagementFooter />
    </>
}

export default UserManagement;