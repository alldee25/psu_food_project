import { SET_DATA_CART } from "./actions";

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
        default:
            return state;
    }
}
export default userReducer;