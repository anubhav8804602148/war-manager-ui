import { Box, Button, FormControl, TextField } from "@mui/material"
import axios from "axios";
import "../app-manager/css/appStyle.css"
import { useState } from "react"

export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [killedMetrics, setKilledMetrics] = useState({
        hunted: 12,
        dismembered: 2000,
        tormented: 245,
        spectralized: 10,
        cursed: 90,
        devoured: 100
    })

    const handleLoginSubmit = () => {
        axios.post(
            "http://localhost:10000/war-manager-authentication-service/authentication/login",
            {
                username: username,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(loginResponse => {
                if (loginResponse.headers.authenticationheader) {
                    sessionStorage.setItem("authenticationheader", loginResponse.headers.authenticationheader);
                    window.location.href = "/map";
                }

            })
    }

    const handleReset = () => {
        setUsername("");
        setPassword("");
    }

    return <div style={{ display: "flex" }}>
        <div id="killedMetricsForm">
            <Box sx={{ mt: 5, ml: 10 }}>
                {/* <FormControl>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Hunted: <input value={killedMetrics.hunted}></input></label>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Dismembered: <input value={killedMetrics.dismembered}></input></label>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Cursed: <input value={killedMetrics.cursed}></input></label>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Devoured: <input value={killedMetrics.devoured}></input></label>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Tormented: <input value={killedMetrics.tormented}></input></label>
                    <label className="spooky-theme" style={{ fontSize: 20 }}>Spectralized: <input value={killedMetrics.spectralized}></input></label>
                </FormControl> */}
            </Box>
        </div>
        <Box sx={{ mt: 5, ml: 10, pl: 60 }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ backgroundColor: "white", padding: 20, borderRadius: "20px 5px 5px 5px" }}>
                    <FormControl>
                        <label style={{ fontSize: "24px", textAlign: "center", maxWidth: "100%", marginBottom: "20px" }}>{"Login"}</label>
                        <TextField value={username} onChange={event => setUsername(event.target.value)} variant="filled" type="text" placeholder="username" style={{ marginBottom: 10 }}></TextField>
                        <TextField value={password} onChange={event => setPassword(event.target.value)} variant="filled" type="password" placeholder="password"></TextField>
                        <Button type="submit" style={{ height: "40px", marginTop: "20px" }} variant="contained" size="large" onClick={() => handleLoginSubmit()}>{"Submit"}</Button>
                        <Button type="reset" style={{ height: "40px", marginTop: "10px" }} variant="outlined" size="large" onClick={() => handleReset()}>{"Cancel"}</Button>
                    </FormControl>
                </div>
                <div style={{ marginRight: 100 }}><img alt="" src="war-manager-icon.png" width={200}></img></div>
            </div>
        </Box>
    </div>
}