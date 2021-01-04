import React, {useContext} from 'react';
import styled from '@emotion/styled';
import seleccionContext from '../context/seleccion/seleccionContext';

const Nav = styled.div`
    display: inline-block;
`;

const Item = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    font-size: 1.2rem;
    text-transform: uppercase;
    transition: all .3s ease;
    &:hover {
        color: var(--colorNaranja);
    }
    &:focus {
        outline: none;
    }
    @media (min-width: 400px){
        font-size: 1.3rem;
    }
    @media (min-width: 440px){
        font-size: 1.5rem;
    }
    @media (min-width: 460px){
        font-size: 1.6rem;
    }

`;

const NavSecundario = styled(Nav)`
    border-top: 1px solid #7a7a7a;
    padding-top: 1rem;
    margin-top: 1rem;
`;

const ItemSec = styled(Item)`
    /* padding: 0 1rem;
    border-right: 1px solid #7a7a7a;
    line-height: 1.5rem;
    &:last-of-type {
        border-right: none;
    } */
`;

const NavegacionMenu = () => {

    const SeleccionContext = useContext(seleccionContext);
    const { cambiarSeleccion, etapa, v_pais, v_tipo } = SeleccionContext;
    
    return (
        <div className="py-5 mx-auto text-center">
            <Nav>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'comidas')}
                    className={etapa === 'comidas' ? 'activo' : null}
                >Comidas</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'vinos')}
                    className={etapa === 'vinos' ? 'activo' : null}
                >Vinos</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'cocteleria')}
                    className={etapa === 'cocteleria' ? 'activo' : null}
                >Coctelería</Item>
                <Item
                    onClick={() => cambiarSeleccion('etapa', 'bebidas')}
                    className={etapa === 'bebidas' ? 'activo' : null}
                >Bebidas</Item>
            </Nav>

            {
                etapa === 'vinos' ? (
                    <NavSecundario>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'copa')}
                            className={v_pais === 'copa' ? 'activo' : null}
                        >Por copa</Item>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'argentina')}
                            className={v_pais === 'argentina' ? 'activo' : null}
                        >Argentina</Item>
                        <Item
                            onClick={() => cambiarSeleccion('v_pais', 'mundo')}
                            className={v_pais === 'mundo' ? 'activo' : null}
                        >Del mundo</Item>
                    </NavSecundario>
                ) : null
            }
        </div>
    );
}
 
export default NavegacionMenu;