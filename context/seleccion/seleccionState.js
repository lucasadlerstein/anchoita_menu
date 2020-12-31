import React, {useReducer, useState, useEffect} from 'react';
import seleccionContext from './seleccionContext';
import seleccionReducer from './seleccionReducer';
import { NUEVA_ETAPA, NUEVA_V_PAIS, NUEVA_V_TIPO, VISIBILIDAD_CARRITO, VACIAR_CARRITO, CAMBIAR_CANTIDAD, AGREGAR_NUEVO, GET_STORAGE } from '../../types/index';

const SeleccionState = ({children}) => {

    const stateInicial = {
        etapa: null,
        v_pais: null,
        v_tipo: null,
        carrito: false,
        productosCarrito: [
            {
                categoria: 'comidas',
                nombre: 'Bla bla bla',
                cantidad: 1
            },
            {
                categoria: 'comidas',
                nombre: 'Bla bla blassss s s',
                cantidad: 1
            },
        ]
    }

    const [state, dispatch] = useReducer(seleccionReducer, stateInicial);

    const cambiarSeleccion = (llave, valor) => {
        if (llave === 'etapa') {
            dispatch({
                type: NUEVA_ETAPA,
                payload: valor
            })
        } else if (llave === 'v_tipo') {
            dispatch({
                type: NUEVA_V_TIPO,
                payload: valor
            })
        } else if (llave === 'v_pais') {
            dispatch({
                type: NUEVA_V_PAIS,
                payload: valor
            })
        }
    }

    const visibilidadCarrito = (estado) => {
        dispatch({
            type: VISIBILIDAD_CARRITO,
            payload: !estado
        })
    }

    const vaciarCarrito = () => {
        dispatch({
            type: VACIAR_CARRITO
        })
        actualizarStorage();
    }

    const cambiarCantidad = (nombre, operacion) => {
        const info = { nombre, operacion }
        dispatch({
            type: CAMBIAR_CANTIDAD,
            payload: info
        })
        actualizarStorage();
    }

    const agregarNuevo = (info) => {
        dispatch({
            type: AGREGAR_NUEVO,
            payload: info
        })
        actualizarStorage();
    }

    const actualizarStorage = () => {
        localStorage.setItem('carrito', JSON.stringify(state.productosCarrito));
    }

    const getStorage = () => {
        dispatch({
            type: GET_STORAGE,
            payload: JSON.parse(localStorage.getItem('carrito'))
        })
    }

    return (
        <seleccionContext.Provider
            value={{
                etapa: state.etapa,
                v_pais: state.v_pais,
                v_tipo: state.v_tipo,
                carrito: state.carrito,
                productosCarrito: state.productosCarrito,
                cambiarSeleccion,
                visibilidadCarrito,
                vaciarCarrito,
                cambiarCantidad,
                agregarNuevo,
                actualizarStorage,
                getStorage
            }}
        >
            {children}
        </seleccionContext.Provider>
    )
}

export default SeleccionState;