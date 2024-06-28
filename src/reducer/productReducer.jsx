const productReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_PRODUCTS":
            return { ...state.products, products: [...state.products, action.payload] };
        case "UPDATE_PRODUCTS":
            return { ...state, products: state.products.map((pro) => (pro.id === action.payload.id ? action.payload : pro)) }
        case "DELETE_PRODUCTS":
            return { ...state, products: state.products.filter((pro) => pro.id !== action.payload) };
        default:
            return state;
    }
}

export default productReducer