interface UserDetails{
    userDetailsId: number;
    account: Account;
    user: User;
    firstName: string;
    lastName: string;
}

interface User{
    confirmPassword: string;
    userId: number;
    username: string;
    email: string;
    authToken: string;
    password: string;
}

interface Account {
    accountId: number;
    roles: Role[];
    locked: boolean;
    expired: boolean;
    disabled: boolean;
    passwordExpired: boolean;
    flag: string;
}

interface Role{
    roleId: number;
    roleName: string;
    privileges: Privilege[];
}

interface Privilege{
    privilegeId: number;
    privilegeName: string;
}

