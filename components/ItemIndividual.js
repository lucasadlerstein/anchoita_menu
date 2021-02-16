import React, {useContext, useEffect} from 'react';
import styled from '@emotion/styled';
import {Row, Col} from 'reactstrap';
import seleccionContext from '../context/seleccion/seleccionContext';
import {i18n, withTranslation} from '../i18n';

const Item = styled(Row)`
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    /* padding: 0 1rem; */
    color: var(--colorAzul);
`;

const Nombre = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
`;

const Vinedo = styled.p`
    margin: 0;
    font-size: 1.4rem;
`;

const TamanoVino = styled.p`
    margin: 0 1rem 0 0;
    font-size: 1.4rem;
    float: left;
`;

const Precio = styled.p`
    /* font-weight: bold; */
    margin: 0 1rem 0 0;
    text-align: right;
    font-size: 1.8rem;
    font-family: 'RobotoCondensed', serif;
`;

const AgregarBtn = styled.button`
    background-color: transparent;
    font-weight: bold;
    border: none;
    color: var(--colorAzul);
    transition: all .3s ease;
    text-align: center;
    font-size: 2.5rem;
    /* margin: auto; */
    
    position: relative;
    top: -8px;
    white-space:nowrap;
    overflow:visible;

    &:hover{
        color: var(--colorNaranja);
    }
    &:focus {
        outline: none;
    }
`;

const ItemIndividual = ({producto, etapa, t, tamanosBool}) => {

    useEffect(() => {
        if(!producto.descripcion) producto.descripcion = '';
        if(!producto.uva) producto.uva = '';
        if(!producto.anada) producto.anada = '';
        if(!producto.bodega) producto.bodega = '';
        if(!producto.en_nombre) producto.en_nombre = '';
        if(!producto.en_descripcion) producto.en_descripcion = '';
        // eslint-disable-next-line
    }, [])

    const SeleccionContext = useContext(seleccionContext);
    const { agregarNuevo, busqueda, v_pais } = SeleccionContext;

    const agregarAlCarrito = (producto) => {
        const nuevo = {
            nombre: producto.nombre,
            en_nombre: producto.en_nombre,
            descripcion: producto.descripcion,
            en_descripcion: producto.en_descripcion,
            categoria: etapa,
            cantidad: 1
        }
        agregarNuevo(nuevo)
    }

    return (
        <>
        {
            (busqueda === ''
            || producto.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.anada.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.uva.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.bodega.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()) 
            || producto.en_nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            || producto.en_descripcion.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(busqueda.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase())
            ) ? (
                <Item>
                    <Col xs={1}
                        style={{
                            // display: 'flex',
                            // alignItems: 'flex-start',
                            // top: '-9px'
                        }}
                    >
                        <AgregarBtn
                            onClick={() => agregarAlCarrito(producto)}
                        >+</AgregarBtn>
                    </Col>
                    <Col xs={9}>
                        <Nombre>{(i18n.language === 'en' && producto.en_nombre) ? producto.en_nombre : producto.nombre } {(producto.anada ? producto.anada : null)}</Nombre>
                        {
                            (producto.bodega) ? <Vinedo>{producto.bodega} - {producto.uva}</Vinedo> : (producto.descripcion) ? <Vinedo>{(i18n.language === 'en' && producto.en_descripcion) ? producto.en_descripcion : producto.descripcion}</Vinedo> : null
                        }
                        {
                            (v_pais === 'copa') ? (
                                <>
                                    {(producto.c140) ? <TamanoVino>140ml </TamanoVino> : null}
                                    {(producto.c120) ? <TamanoVino>120ml </TamanoVino> : null}
                                    {(producto.c70) ? <TamanoVino>70ml </TamanoVino> : null}
                                    {(producto.c35) ? <TamanoVino>35ml </TamanoVino> : null}
                                </>
                            ) : (tamanosBool === true) ? (
                                <>
                                    {(producto.t375) ? <TamanoVino>375ml </TamanoVino> : null}
                                    {(producto.t500) ? <TamanoVino>500ml </TamanoVino> : null}
                                    {(producto.t1125) ? <TamanoVino>1125ml </TamanoVino> : null}
                                    {(producto.t1500) ? <TamanoVino>1500ml </TamanoVino> : null}
                                    {(producto.t3000) ? <TamanoVino>3000ml </TamanoVino> : null}
                                </>
                            ) : null
                        }
                    </Col>
                    <Col xs={2} className="pl-0">
                        <Precio>{producto.precio}</Precio>
                    </Col>
                </Item>
            ) : null
        }
        </>
    );
}
 
export default withTranslation('common')(ItemIndividual);