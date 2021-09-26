export const SET_DATA_CART = 'SET_DATA_CART';
export const DELETE_SOME_VALUE = 'DELETE_SOME_VALUE';
export const DELETE_MANY_VALUE = 'DELETE_MANY_VALUE';

export const setDataCart = (cart) => {
    return {
        type:SET_DATA_CART,
        payload: cart,
    };
};
export const DeleteDataCart = (id) => {
    return {
        type:DELETE_SOME_VALUE,
        payload: id,
    };
};
export const DeleteManyDataCart = (id) => {
    return {
        type:DELETE_MANY_VALUE,
        payload: id,
    };
};
