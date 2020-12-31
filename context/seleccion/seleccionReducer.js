import {
    NUEVA_ETAPA, NUEVA_V_PAIS, NUEVA_V_TIPO, VISIBILIDAD_CARRITO, VACIAR_CARRITO, CAMBIAR_CANTIDAD, AGREGAR_NUEVO, GET_STORAGE
} from '../../types/index';

const Reducer = (state, action) => {

    switch(action.type) {
                
        case NUEVA_ETAPA:
            return {
                ...state,
                etapa: action.payload,
                v_tipo: null,
                v_pais: null
            }

        case NUEVA_V_PAIS:
        return {
            ...state,
            v_pais: action.payload,
            v_tipo: null
        }

        case NUEVA_V_TIPO:
            return {
                ...state,
                v_tipo: action.payload
            }

        case VISIBILIDAD_CARRITO: 
            return {
                ...state,
                carrito: action.payload
            }

        case VACIAR_CARRITO:
            return {
                ...state,
                productosCarrito: []
            }

        case AGREGAR_NUEVO:
            return {
                ...state,
                productosCarrito: [...state.productosCarrito, action.payload]
            }

        case CAMBIAR_CANTIDAD:
            const carr = state.productosCarrito.map(prod => {
                if(prod.nombre === action.payload.nombre) {
                    if(action.payload.operacion === 'suma') {
                        prod.cantidad ++;
                    } else if (action.payload.operacion === 'resta') {
                        prod.cantidad --;
                    }
                    return prod;
                } else {
                    return prod;
                }
            })
            return {
                ...state,
                productosCarrito: carr
            }

        case GET_STORAGE:
            return {
                ...state,
                productosCarrito: action.payload
            }

        default:
            return state;
    }
}
 
export default Reducer;