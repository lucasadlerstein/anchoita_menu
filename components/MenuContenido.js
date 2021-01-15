import React, {useEffect, useContext} from 'react';
import styled from '@emotion/styled';
import ItemIndividual from './ItemIndividual';
import seleccionContext from '../context/seleccion/seleccionContext';
import {withTranslation} from '../i18n';

const Fondo = styled.div`
    background-color: white;
    padding: 1rem 0;
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
    font-size: 1.6rem;
    margin-bottom: .5rem;
    font-weight: bold;
    margin-top: 3rem;
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
        vertical-align: text-top;
    }
`;

const MenuContenido = ({contenido, tipo, categorias, etapa, t}) => {

    useEffect(() => {
        window.location.href = `#${tipo}`;
        // eslint-disable-next-line
    }, [])

    const SeleccionContext = useContext(seleccionContext);
    const {cambiarSeleccion} = SeleccionContext;

    return (
        <Fondo>
            {
                (etapa === 'bebidas') ? (
                    <VolverBtn
                        onClick={() => cambiarSeleccion('etapa', null)}
                    >{t('Alternativos.Volver')}</VolverBtn>
                ) : (
                    <VolverBtn
                        onClick={() => cambiarSeleccion('v_tipo', null)}
                    >{t('Alternativos.Volver')}</VolverBtn>
                )
            }
            {/* <Provincia>Salta</Provincia> */}
            {/* <Uva>Chardonnay</Uva> */}

            {
                categorias.map((item, i) => (
                    <div key={item.codigo}>
                        <Provincia id={item.codigo}>{item.nombre}</Provincia>
                        {
                            contenido.map(prod => (
                                (prod.categoria === item.codigo && prod.visible === true) ? (
                                    <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                ) : (prod.destacado === true && prod.visible === true && item.codigo === 'destacado') ? (
                                    <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                ) : null
                            ))
                        }
                    </div>       
                ))
            }
        </Fondo>
    );
}
 
export default withTranslation('common')(MenuContenido);