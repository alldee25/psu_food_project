import { SET_DATA_CART, DELETE_SOME_VALUE, DELETE_MANY_VALUE } from "./actions";

const initialState = {
    cart: [],
}

function userReducer(state = initialState, action){
    switch (action.type) {
        case SET_DATA_CART:
            const updateCart = [...state.cart,action.payload];
            return {
                ...state,
                cart: updateCart
            }
        case DELETE_SOME_VALUE:
        return {
            ...state,
            cart: state.cart.filter(item => item.id !== action.payload)
        }
        case DELETE_MANY_VALUE:
            let orderData = []
            action.payload.map((data)=>{
                state.cart.splice(state.cart.findIndex(i => i.id == data), 1);
                })
        return {
            ...state,
            cart: state.cart
        }
        default:
            return state;
    }

}
export default userReducer;