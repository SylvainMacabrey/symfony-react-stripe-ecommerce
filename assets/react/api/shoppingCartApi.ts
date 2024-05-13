import { Product } from "./productApi";

const axios = require('axios');

export interface ShoppingCart {
    items: Array<ShoppingCartItem>;
};

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

export async function getShoppingCart()  {
    try {
        const response = await axios.get(`/session/shopping-cart`);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export async function addItemToShoppingCart(product: Product) {
    try {
        const response = await axios.post(
            `/session/shopping-cart/add`, 
            { id: product.id }, 
            { 
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export async function deleteItemFromShoppingCart(product: Product) {
    try {
        const response = await axios.delete(`/session/shopping-cart/delete/${ product.id }`);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

export async function checkoutSession() {
    try {
        const response = await axios.post(`/stripe/checkout-session`, {}, { 
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}