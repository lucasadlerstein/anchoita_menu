import SeleccionState from '../context/seleccion/seleccionState';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SeleccionState>
      <Component {...pageProps} />
    </SeleccionState>
  ) 
}

export default MyApp;