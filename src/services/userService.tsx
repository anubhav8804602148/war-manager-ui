import axios from "axios";

let userDetails = {} as UserDetails;
const getAndStoreUserDetails = () => {
    axios
        .post(import.meta.env.VITE_API_AUTHENTICATION_USER_DETAILS)
        .then(userDetailsResponse => {
            userDetails = userDetailsResponse.data as UserDetails;
        });
}

const hasPrivilege = (privilege: string) => {
    return userDetails
        ?.account
        ?.roles
        ?.map(role => role.privileges)
        ?.flat()
        ?.map(priv => priv.privilegeName)
        ?.includes(privilege);
}
export {getAndStoreUserDetails, hasPrivilege};
