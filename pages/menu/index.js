import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Container} from 'reactstrap';
import NavegacionMenu from '../../components/NavegacionMenu';
import EleccionContenido from '../../components/EleccionContenido';
import MenuContenido from '../../components/MenuContenido';
import VinosContenido from '../../components/VinosContenido';
import seleccionContext from '../../context/seleccion/seleccionContext';
import Carrito from '../../components/Carrito';
import clienteAxios from '../../config/axios';

const Menu = () => {

    const SeleccionContext = useContext(seleccionContext);
    const { etapa, v_pais, v_tipo, carrito, visibilidadCarrito, getStorage } = SeleccionContext;

    const [vinos, setVinos] = useState([]);
    const [cocteles, setCocteles] = useState([]);
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('carrito')) {
            getStorage();
        }
        async function traerInfo() {
            await clienteAxios.get('/vinos/todos')
                .then(resp => { setVinos(resp.data.vinos); })
                .catch(err => { console.log('V-404-V'); })

            await clienteAxios.get('/platos/todos')
                .then(resp => { setPlatos(resp.data.platos); })
                .catch(err => { console.log('P-404-P'); })

            await clienteAxios.get('/cocteles/todos')
                .then(resp => { setCocteles(resp.data.cocteles); })
                .catch(err => { console.log('C-404-C'); })
        }
        traerInfo();
        // eslint-disable-next-line
    }, [])

    const cPlatos = [
        { nombre: 'Con la mano', codigo: 'mano' },
        { nombre: 'Quesos', codigo: 'quesos' },
        { nombre: 'Crudas', codigo: 'crudas' },
        { nombre: 'Charcutería de elaboración propia', codigo: 'charculateria' },
        { nombre: 'Vegetales', codigo: 'vegetales' },
        { nombre: 'De río y mar argentinos', codigo: 'rio-mar' },
        { nombre: 'Huevos', codigo: 'huevos' },
        { nombre: 'Chuletones', codigo: 'chuletones' },
        { nombre: 'Carnes', codigo: 'carnes' },
        { nombre: 'Pastas', codigo: 'pastas' },
        { nombre: 'Postres', codigo: 'postres' },
        { nombre: 'Helados', codigo: 'helados' },
    ]

    const cVinos = [ 
        { nombre: 'Espumoso', codigo: 'espumoso' },
        { nombre: 'Blanco', codigo: 'blanco' },
        { nombre: 'Naranjo', codigo: 'naranjo' },
        { nombre: 'Rosado', codigo: 'rosado' },
        { nombre: 'Tinto', codigo: 'tinto' },
        { nombre: 'Dulce', codigo: 'dulce' },
        { nombre: 'Fortificado seco', codigo: 'fort-seco' },
        { nombre: 'Fortificado dulce', codigo: 'fort-dulce' }
    ]

    const cCocteleria = [ 
        { nombre: 'Bebidas', codigo: 'Bebidas' },
        { nombre: 'Cócteles', codigo: 'Cócteles' },
        { nombre: 'Refrescos', codigo: 'Refrescos' },
        { nombre: 'Cervezas', codigo: 'Cervezas' },
        { nombre: 'Sidras', codigo: 'Sidras' },
        { nombre: 'Destilados', codigo: 'Destilados' },
    ]

    return (
        <Container className="py-5r">
            <Row>
                <Col xs={2} className="my-auto text-right">
                    <img src="img/search-icon.png" alt="Buscar en el menú" style={{width: '2rem'}} />
                </Col>
                <Col xs={8} className="text-center">
                    <img src="img/logo-menu.png" alt="Logo Anchoita" style={{maxHeight: '4rem'}} />
                </Col>
                <Col xs={2} className="my-auto text-left">
                    <a
                        onClick={() => visibilidadCarrito(carrito)}
                    ><img  src="img/pedido-icon.png" alt="Ver mi pedido" style={{width: '2rem'}} /></a>
                    
                </Col>
            </Row>

            <NavegacionMenu />

            { (etapa !== null) ? <EleccionContenido /> : null }
            
            {
                (etapa === 'comidas' && v_tipo !== null) ? (
                    <MenuContenido contenido={platos} tipo={v_tipo} categorias={cPlatos} etapa={etapa} />
                ) : null
            }

            {
                (etapa === 'vinos' && v_tipo !== null && v_pais !== null) ? (
                    <VinosContenido contenido={vinos} tipo={v_tipo} pais={v_pais} categorias={cVinos} etapa={etapa} />
                ) : null
            }

            {
                (etapa === 'cocteleria' && v_tipo !== null) ? (
                    <MenuContenido contenido={cocteles} tipo={v_tipo} categorias={cCocteleria} etapa={etapa} />
                ) : null
            }

            {
                (etapa === 'bebidas') ? (
                    <MenuContenido contenido={cocteles} tipo={v_tipo} categorias={cCocteleria} etapa={etapa} />
                ) : null
            }

            { (carrito) ? <Carrito /> : null }

        </Container>
    );
}
 
export default Menu;