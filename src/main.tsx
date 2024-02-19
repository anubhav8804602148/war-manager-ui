import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import warZoneStore from './war-zone-map/store/WarZoneStore.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={warZoneStore}>
    <App />
  </Provider>
)
