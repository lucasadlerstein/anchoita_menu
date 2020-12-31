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
const TipoUva = styled.p`
    text-transform: uppercase;
    color: var(--colorNaranja);
    padding-left: 3rem;
    font-size: 1.8rem;
    margin-bottom: .5rem;
`;
const Provincia = styled.p`
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

const VinosContenido = ({contenido, tipo, pais, categorias, etapa}) => {
    
    useEffect(() => {
        window.location.href = `#${tipo}`;
        // eslint-disable-next-line
    }, [])

    const regiones = [
        { pais: 'mundo', es: 'Borgoña', en: 'Burgundy' },
        { pais: 'mundo', es: 'Burdeos', en: 'Bordeaux' },
        { pais: 'mundo', es: 'Champagne', en: 'Champagne' },
        { pais: 'mundo', es: 'Toscana', en: 'Tuscany' },
        { pais: 'mundo', es: 'Piemonte', en: '' },
        { pais: 'mundo', es: 'Mosel', en: '' },
        { pais: 'mundo', es: 'Malborough', en: '' },
        { pais: 'mundo', es: 'Montsant', en: '' },
        { pais: 'mundo', es: 'Penedés', en: '' },
        { pais: 'mundo', es: 'Rias Baixas', en: '' },
        { pais: 'mundo', es: 'Valdeorras', en: '' },
        { pais: 'mundo', es: 'Montilla - Moriles', en: '' },
        { pais: 'mundo', es: 'Jerez de la Frontera', en: '' },
        { pais: 'mundo', es: 'Sanlúcar de Barrameda', en: '' },
        { pais: 'mundo', es: 'Tenerife', en: '' },
        { pais: 'mundo', es: 'Priorat', en: '' },
        { pais: 'mundo', es: 'Ribera del Duero', en: '' },
        { pais: 'mundo', es: 'Sierra de Gredos', en: '' },
        { pais: 'mundo', es: 'Elqui', en: '' },
        { pais: 'mundo', es: 'Itata', en: '' },
        { pais: 'mundo', es: 'Maipo', en: '' },
        { pais: 'mundo', es: 'Maule', en: '' },
        { pais: 'mundo', es: 'Madeira', en: '' },
        { pais: 'mundo', es: 'Oporto', en: '' },
        { pais: 'mundo', es: 'Valle de Uco', en: '' },
        { pais: 'mundo', es: 'Luján de Cuyo', en: '' },
        { pais: 'mundo', es: 'Valles Calchaquíes', en: '' },
        { pais: 'mundo', es: 'Trevelin', en: '' },
        { pais: 'argentina', es: 'Buenos Aires', en: 'Buenos Aires' },
        { pais: 'argentina', es: 'Catamarca', en: 'Catamarca' },
        { pais: 'argentina', es: 'Chubut', en: 'Chubut' },
        { pais: 'argentina', es: 'Córdoba', en: 'Córdoba' },
        { pais: 'argentina', es: 'Jujuy', en: 'Jujuy' },
        { pais: 'argentina', es: 'La Rioja', en: 'La Rioja' },
        { pais: 'argentina', es: 'Mendoza', en: 'Mendoza' },
        { pais: 'argentina', es: 'Río Negro', en: 'Río Negro' },
        { pais: 'argentina', es: 'Salta', en: 'Salta' },
        { pais: 'argentina', es: 'San Juan', en: 'San Juan' },
    ]

    return (
        <Fondo>
            {/* <VolverBtn>VOLVER</VolverBtn> */}

            {/* <TipoUva>Salta</TipoUva> */}
            {/* <Provincia>Chardonnay</Provincia> */}

            {
                categorias.map((item, i) => (
                    <div key={item.codigo}>
                        <TipoUva id={item.codigo}>{item.nombre}</TipoUva>
                        {
                            regiones.map((reg, index) => {
                                if(reg.pais === pais || pais === 'copa') {
                                return (
                                <div key={reg.es}>
                                    <Provincia id={reg.es}>{reg.es}</Provincia>
                                    {contenido.map(prod => (
                                        (prod.tipo === item.codigo && prod.region === reg.es) ? (
                                            (pais === 'argentina' && prod.pais === 'Argentina') ? (
                                                <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                            ) : (pais === 'mundo' && prod.pais !== 'Argentina') ? (
                                                <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                            ) : (pais === 'copa' && prod.copa === true) ? (
                                                <ItemIndividual key={prod.id} producto={prod} etapa={etapa} />
                                            ) : null
                                        ) : null
                                    ))}
                                </div>
                            )}})
                        }
                    </div>       
                ))
            }
        </Fondo>
    );
}
 
export default VinosContenido;