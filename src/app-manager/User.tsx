import UserManagementFooter from './UserManagementFooter';
import UserManagementHeader from './UserManagementHeader';
import './css/userManagement.css';
const User = () => {
    return <>
        <UserManagementHeader />
        <div className="container">
            <div className="card">
                Users list
            </div>
            <div className="card">
                Users list info
            </div>
        </div>
        <UserManagementFooter />
    </>
}

export default User;