import React, {useEffect} from 'react';
import styled from '@emotion/styled';
import ItemIndividual from './ItemIndividual';

const Fondo = styled.div`
    background-color: white;
    padding: 4rem 0;
    position: relative;
`;
const VolverBtn = styled.button`
    color: var(--colorAzul);
    position: absolute;
    top: 5px;
    left: 5px;
    border: none;
    font-size: 1.2rem;
    font-weight: bold;
    padding: .1rem 1rem;
    background-color: #cacaca;  
    transition: all .3s ease;
    &:hover {
        background-color: #f0f0f0;
    }
    &:focus {
        outline: none;
    }
`;
const Provincia = styled.p`
    text-transform: uppercase;
    color: var(--colorNaranja);
    padding-left: 3rem;
    font-size: 1.8rem;
    margin-bottom: .5rem;
`;
const Uva = styled.p`
    color: black;
    padding-left: 4.2rem;
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    &:before {
        content: '•';
        padding-right: .5rem;
        vertical-align: text-bottom;
    }
`;

const MenuContenido = ({contenido, tipo, categorias, etapa}) => {

    useEffect(() => {
        window.location.href = `#${tipo}`;
        // eslint-disable-next-line
    }, [])

    return (
        <Fondo>
            {/* <VolverBtn>VOLVER</VolverBtn> */}

            {/* <Provincia>Salta</Provincia> */}
            {/* <Uva>Chardonnay</Uva> */}

            {
                categorias.map((item, i) => (
                    <>
                        <Provincia key={item.codigo} id={item.codigo}>{item.nombre}</Provincia>
                        {
                            contenido.map(prod => (
                                (prod.categoria === item.codigo) ? (
                                    <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                ) : null
                            ))
                        }
                    </>       
                ))
            }
        </Fondo>
    );
}
 
export default MenuContenido;