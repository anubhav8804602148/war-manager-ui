import UserManagementFooter from './UserManagementFooter';
import UserManagementHeader from './UserManagementHeader';
import './css/userManagement.css';
const UserDetails = () => {
    return <>
        <UserManagementHeader />
        <div className="container">
            <div className="card">
                This is where we manage users details
            </div>
            <div className="card">
                Here we see extra details
            </div>
        </div>
        <UserManagementFooter />
    </>
}

export default UserDetails;