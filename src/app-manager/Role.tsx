import UserManagementFooter from './UserManagementFooter';
import UserManagementHeader from './UserManagementHeader';
import './css/userManagement.css';
const Role = () => {
    return <>
        <UserManagementHeader />
        <div className="container">
            <div className="card">
                This is where we manage users
            </div>
            <div className="card">
                Here we see extra details
            </div>
        </div>
        <UserManagementFooter />
    </>
}

export default Role;