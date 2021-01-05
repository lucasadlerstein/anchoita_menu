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
import {withTranslation} from '../../i18n';
import Link from 'next/link';
import ScrollTop from '../../components/ScrollTop';
import PropTypes from 'prop-types'

const Menu = ({t}) => {

    const SeleccionContext = useContext(seleccionContext);
    const { etapa, v_pais, v_tipo, carrito, visibilidadCarrito, getStorage, cambiarBusqueda, busqueda, shake, productosCarrito } = SeleccionContext;

    const [buscador, setBuscador] = useState(false);

    const [vinos, setVinos] = useState([]);
    const [cocteles, setCocteles] = useState([]);
    const [platos, setPlatos] = useState([]);
    const [stickyHeader, setStickyHeader] = useState(false)
    
    function chequearScroll() {
        if (!stickyHeader && window.pageYOffset > 120){
            setStickyHeader(true)
            document.querySelector('body').classList.add('mt-10r');
        } else if (stickyHeader && window.pageYOffset <= 120){
            setStickyHeader(false)
            document.querySelector('body').classList.remove('mt-10r');
        }  
    }

    window.addEventListener('scroll', chequearScroll)

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
        { nombre: t('CatPlatos.Mano'), codigo: 'mano' },
        { nombre: t('CatPlatos.Quesos'), codigo: 'quesos' },
        { nombre: t('CatPlatos.Crudas'), codigo: 'crudas' },
        { nombre: t('CatPlatos.Charcuteria'), codigo: 'charcuteria' },
        { nombre: t('CatPlatos.Vegetales'), codigo: 'vegetales' },
        { nombre: t('CatPlatos.RioMar'), codigo: 'rio-mar' },
        { nombre: t('CatPlatos.Huevos'), codigo: 'huevos' },
        { nombre: t('CatPlatos.Chuletones'), codigo: 'chuletones' },
        { nombre: t('CatPlatos.Carnes'), codigo: 'carnes' },
        { nombre: t('CatPlatos.Pastas'), codigo: 'pastas' },
        { nombre: t('CatPlatos.Postres'), codigo: 'postres' },
        { nombre: t('CatPlatos.Helados'), codigo: 'helados' },
    ]

    const cVinos = [ 
        { nombre: t('CatVinos.Espumoso'), codigo: 'espumoso' },
        { nombre: t('CatVinos.Blanco'), codigo: 'blanco' },
        { nombre: t('CatVinos.Naranjo'), codigo: 'naranjo' },
        { nombre: t('CatVinos.Rosado'), codigo: 'rosado' },
        { nombre: t('CatVinos.Tinto'), codigo: 'tinto' },
        { nombre: t('CatVinos.Dulce'), codigo: 'dulce' },
        { nombre: t('CatVinos.FortificadoSeco'), codigo: 'fort-seco' },
        { nombre: t('CatVinos.FortificadoDulce'), codigo: 'fort-dulce' },
        { nombre: t('CatVinos.OtrosTamanos'), codigo: 'tamanos' },
    ]

    const cCocteleria = [ 
        { nombre: t('CatCocteleria.Cocteles'), codigo: 'Cócteles' },
        { nombre: t('CatCocteleria.Refrescos'), codigo: 'Refrescos' },
        { nombre: t('CatCocteleria.Cervezas'), codigo: 'Cervezas' },
        { nombre: t('CatCocteleria.Sidras'), codigo: 'Sidras' },
        { nombre: t('CatCocteleria.Destilados'), codigo: 'Destilados' },
        // { nombre: 'Bebidas', codigo: 'Bebidas' },
    ]

    const cBebidas = [
        { nombre: t('CatBebidas.Bebidas'), codigo: 'Bebidas' },
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

    const RowPersonalizada = styled(Row)`
        background-color: var(--colorAzul);
        position: sticky;
        top: 3rem;
        z-index: 998;
        padding: 2rem 0;
    `;

    const Notificacion = styled.span`
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        padding: .5rem;
        border-radius: 100%;
        background: red;
        color: white;
    `;

    const handleChangeBusqueda = e => {
        cambiarBusqueda(e.target.value)
    }

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <title>{t('SEO.Titulo')}</title>
                <meta name="description" content={t('SEO.Descripcion')} />
                <meta name="keywords" content={t('SEO.Keywords')} />
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
                <RowPersonalizada>
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
                                <a onClick={() => setBuscador(!buscador)} ><img src="img/search-icon.png" alt={t('Alternativos.Buscar')} style={{width: '2rem'}} /></a>
                            )
                        }
                    </Col>
                    <Col xs={buscador ? 3 : 8} className={`text-center ${buscador ? 'px-0' : ''}`}>
                        <Link href="/">
                            <a>
                                <img src="img/logo-menu.png" alt="Logo Anchoita" style={{maxHeight: '4rem'}} />
                            </a>
                        </Link>
                    </Col>
                    <Col xs={2} className={`my-auto text-left`}>
                        <a onClick={() => visibilidadCarrito(carrito)} style={{position: 'relative'}}>
                            <img  src="img/pedido-icon.png" alt={t('Alternativos.VerWish')} style={{width: '2rem'}} className={shake ? 'shake-and-pop' : null} />
                            {
                                (productosCarrito.length !== 0) ? <Notificacion></Notificacion> : null
                            }
                        </a>
                    </Col>
                </RowPersonalizada>

                <NavegacionMenu />

                { (etapa !== null) ? <EleccionContenido 
                    cPlatos={cPlatos} cCocteleria={cCocteleria} cVinos={cVinos} cBebidas={cBebidas}
                /> : null }
                
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

                <ScrollTop />
            </Container>
        </>
    );
}

Menu.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

Menu.propTypes = {
    t: PropTypes.func.isRequired,
}
 
export default withTranslation('common')(Menu);