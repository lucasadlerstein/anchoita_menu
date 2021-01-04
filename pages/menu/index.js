import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Container} from 'reactstrap';
import NavegacionMenu from '../../components/NavegacionMenu';
import EleccionContenido from '../../components/EleccionContenido';
import MenuContenido from '../../components/MenuContenido';
import VinosContenido from '../../components/VinosContenido';
import seleccionContext from '../../context/seleccion/seleccionContext';
import Carrito from '../../components/Carrito';
import clienteAxios from '../../config/axios';
import styled from '@emotion/styled';
import Head from 'next/head';

const Menu = () => {

    const SeleccionContext = useContext(seleccionContext);
    const { etapa, v_pais, v_tipo, carrito, visibilidadCarrito, getStorage, cambiarBusqueda, busqueda } = SeleccionContext;

    const [buscador, setBuscador] = useState(false);

    const [vinos, setVinos] = useState([]);
    const [cocteles, setCocteles] = useState([]);
    const [platos, setPlatos] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('carrito')) {
            getStorage();
        }
        async function traerInfo() {
            await clienteAxios.get('/platos/todos')
                .then(resp => { setPlatos(resp.data.platos); })
                .catch(err => { console.log('P-404-P'); })

            await clienteAxios.get('/cocteles/todos')
                .then(resp => { setCocteles(resp.data.cocteles); })
                .catch(err => { console.log('C-404-C'); })

            await clienteAxios.get('/vinos/todos')
                .then(resp => { setVinos(resp.data.vinos); })
                .catch(err => { console.log('V-404-V'); })
        }
        traerInfo();
        // eslint-disable-next-line
    }, [])

    const cPlatos = [
        { nombre: 'Con la mano', codigo: 'mano' },
        { nombre: 'Quesos', codigo: 'quesos' },
        { nombre: 'Crudas', codigo: 'crudas' },
        { nombre: 'Charcutería de elaboración propia', codigo: 'charcuteria' },
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
        { nombre: 'Fortificado dulce', codigo: 'fort-dulce' },
        { nombre: 'Otros tamaños', codigo: 'tamanos' },
    ]

    const cCocteleria = [ 
        { nombre: 'Cócteles', codigo: 'Cócteles' },
        { nombre: 'Refrescos', codigo: 'Refrescos' },
        { nombre: 'Cervezas', codigo: 'Cervezas' },
        { nombre: 'Sidras', codigo: 'Sidras' },
        { nombre: 'Destilados', codigo: 'Destilados' },
        // { nombre: 'Bebidas', codigo: 'Bebidas' },
    ]

    const cBebidas = [
        { nombre: 'Bebidas', codigo: 'Bebidas' },
    ]

    const BuscadorInput = styled.input`
        border: none;
        border-bottom: 1px solid white;
        color: white;
        background-color: transparent;
        width: calc(98% - 1.2rem);
        &:focus {
            outline: none;
        }
    `;

    const handleChangeBusqueda = e => {
        cambiarBusqueda(e.target.value)
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>Anchoita | Menú Digital</title>
                <meta name="description" content="" />
                <meta name="keywords" content="menu, anchoita, comida, vinos, Anchoita Argentina, Juan Ramírez de Velasco 1520" />
                <link
                    rel="preload"
                    href="/fonts/RobotoCondensed/RobotoCondensed-Regular.ttf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/RobotoCondensed/RobotoCondensed-Bold.ttf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/Henderson/Henderson-Sans-Regular.otf"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/Henderson/Henderson-Sans-Bold.otf"
                    as="font"
                    crossOrigin=""
                />
            </Head>
            <Container className="py-5r">
                <Row>
                    <Col xs={buscador ? 7 : 2} className={`my-auto ${buscador ? 'text-center' : 'text-right'}`}>
                        { buscador ? (
                            <BuscadorInput type="text" autoFocus value={busqueda} onChange={handleChangeBusqueda} />
                        ) : null }
                        {
                            buscador ? (
                                <a onClick={() => {
                                    setBuscador(!buscador)
                                    cambiarBusqueda('')
                                }}>X</a>
                            ) : (
                                <a onClick={() => setBuscador(!buscador)} ><img src="img/search-icon.png" alt="Buscar en el menú" style={{width: '2rem'}} /></a>
                            )
                        }
                    </Col>
                    <Col xs={buscador ? 3 : 8} className={`text-center ${buscador ? 'px-0' : ''}`}>
                        <img src="img/logo-menu.png" alt="Logo Anchoita" style={{maxHeight: '4rem'}} />
                    </Col>
                    <Col xs={2} className={`my-auto text-left`}>
                        <a onClick={() => visibilidadCarrito(carrito)}>
                            <img  src="img/pedido-icon.png" alt="Ver mi pedido" style={{width: '2rem'}} />
                        </a>
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
                        <MenuContenido contenido={cocteles} tipo={v_tipo} categorias={cBebidas} etapa={etapa} />
                    ) : null
                }

                { (carrito) ? <Carrito /> : null }

            </Container>
        </>
    );
}
 
export default Menu;