import React, {useContext} from 'react';
import styled from '@emotion/styled';
import {Row, Col} from 'reactstrap';
import seleccionContext from '../context/seleccion/seleccionContext';

const Item = styled(Row)`
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
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
    margin: 0;
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

    const SeleccionContext = useContext(seleccionContext);
    const { agregarNuevo } = SeleccionContext;

    const agregarAlCarrito = (producto) => {
        const nuevo = {
            nombre: producto.nombre,
            categoria: etapa,
            cantidad: 1
        }
        agregarNuevo(nuevo)
    }

    return (
        <Item>
            <Col xs={1}>
                <AgregarBtn
                    onClick={() => agregarAlCarrito(producto)}
                >+</AgregarBtn>
            </Col>
            <Col xs={9}>
                <Nombre>{producto.nombre} {(producto.anada ? producto.anada : null)}</Nombre>
                {
                    (producto.vinedo) ? <Vinedo>{producto.vinedo}</Vinedo> : (producto.descripcion) ? <Vinedo>{producto.descripcion}</Vinedo> : null
                }
            </Col>
            <Col xs={2}>
                <Precio>{producto.precio}</Precio>
            </Col>
        </Item>
    );
}
 
export default ItemIndividual;