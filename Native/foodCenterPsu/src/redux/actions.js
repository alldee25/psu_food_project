export const SET_DATA_CART = 'SET_DATA_CART';

export const setDataCart = (cart) => {
    return {
        type:SET_DATA_CART,
        payload: cart,
    };
};
