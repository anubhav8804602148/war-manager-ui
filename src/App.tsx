import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WarMapContainer } from "./war-zone-map/WarMapContainer";
import { Login } from "./app-manager/Login";
import axios from "axios";
import UserManagement from "./app-manager/UserManagement";
import { getAndStoreUserDetails } from "./services/userService";
function App() {
  axios.interceptors.request.use((config) => {
    config.headers["authenticationheader"] = sessionStorage.getItem("authenticationheader");
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  })
  getAndStoreUserDetails();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/login"} Component={Login}></Route>
        <Route path={"/map"} Component={WarMapContainer}></Route>
        <Route path={"/user-management"} Component={UserManagement}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
