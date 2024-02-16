import { Alert } from "@mui/material"

export const AlertBox = (props: any) => {
    const message: string  = props.message;
    const level: any = props.level;

    const getAlertBox = () => {
        if(message && level) {
            return <Alert sx={{fontSize: 16}} severity={level}>{message}</Alert>
        }
    }

    return <div style={{position: "absolute", top: 10, left: "10%", width: "80%", zIndex: 999999}}>
        {getAlertBox()}
    </div>
}