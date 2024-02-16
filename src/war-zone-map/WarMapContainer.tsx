import { Provider } from "react-redux"
import { WarMap } from "./WarMap"
import warZoneStore from "./store/WarZoneStore"

export const WarMapContainer = () => {
    return <Provider store={warZoneStore}>
        <WarMap/>
    </Provider>
}