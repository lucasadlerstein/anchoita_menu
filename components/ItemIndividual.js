import React, {useContext, useEffect} from 'react';
import styled from '@emotion/styled';
import {Row, Col} from 'reactstrap';
import seleccionContext from '../context/seleccion/seleccionContext';

const Item = styled(Row)`
    margin-top: 1rem;
    margin-bottom: 1rem;
    /* padding: 0 1rem; */
    color: var(--colorAzul);
`;

const Nombre = styled.p`
    font-weight: bold;
    font-size: 1.4rem;
    margin: 0;
`;

const Vinedo = styled.p`
    margin: 0;
    font-size: 1.4rem;
`;

const Precio = styled.p`
    font-weight: bold;
    margin: 0 1rem 0 0;
    text-align: right;
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
    position: absolute;
    top: -12px;
    &:hover{
        color: var(--colorNaranja);
    }
    &:focus {
        outline: none;
    }
`;

const ItemIndividual = ({producto, etapa}) => {

    useEffect(() => {
        if(!producto.descripcion) producto.descripcion = '';
        if(!producto.uva) producto.uva = '';
        if(!producto.anada) producto.anada = '';
        if(!producto.bodega) producto.bodega = '';
        // eslint-disable-next-line
    }, [])

    const SeleccionContext = useContext(seleccionContext);
    const { agregarNuevo, busqueda } = SeleccionContext;

    const agregarAlCarrito = (producto) => {
        const nuevo = {
            nombre: producto.nombre,
            categoria: etapa,
            cantidad: 1
        }
        agregarNuevo(nuevo)
    }

    return (
        <>
        {
            (busqueda === ''
            || producto.nombre.normalize("NFD").toLowerCase().includes(busqueda.normalize("NFD").toLowerCase())
            || producto.descripcion.normalize("NFD").toLowerCase().includes(busqueda.normalize("NFD").toLowerCase())
            || producto.anada.toString().normalize("NFD").toLowerCase().includes(busqueda.normalize("NFD").toLowerCase())
            || producto.uva.normalize("NFD").toLowerCase().includes(busqueda.normalize("NFD").toLowerCase())
            || producto.bodega.normalize("NFD").toLowerCase().includes(busqueda.normalize("NFD").toLowerCase()) ) ? (
                <Item>
                    <Col xs={1}>
                        <AgregarBtn
                            onClick={() => agregarAlCarrito(producto)}
                        >+</AgregarBtn>
                    </Col>
                    <Col xs={9}>
                        <Nombre>{producto.nombre} {(producto.anada ? producto.anada : null)}</Nombre>
                        {
                            (producto.bodega) ? <Vinedo>{producto.bodega} - {producto.uva}</Vinedo> : (producto.descripcion) ? <Vinedo>{producto.descripcion}</Vinedo> : null
                        }
                        
                        {(producto.t375) ? <Vinedo>375ml{producto.t750 ? ' - 750ml' : null} </Vinedo> : null}
                        {(producto.t500) ? <Vinedo>500ml{producto.t750 ? ' - 750ml' : null} </Vinedo> : null}
                        {(producto.t1125) ? <Vinedo>1125ml{producto.t750 ? ' - 750ml' : null} </Vinedo> : null}
                        {(producto.t1500) ? <Vinedo>1500ml{producto.t750 ? ' - 750ml' : null} </Vinedo> : null}
                        {(producto.t3000) ? <Vinedo>3000ml{producto.t750 ? ' - 750ml' : null} </Vinedo> : null}
                        
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
 
export default ItemIndividual;