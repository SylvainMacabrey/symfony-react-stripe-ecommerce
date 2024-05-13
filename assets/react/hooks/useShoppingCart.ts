import { useEffect, useState } from "react";
import { ShoppingCart, getShoppingCart, addItemToShoppingCart, deleteItemFromShoppingCart } from "../api/shoppingCartApi";
import { Product } from "../api/productApi";

export default function useShoppingCart() {

    const [shoppingCart, setShoppingCart] = useState<ShoppingCart>();
    const [loading, setLoading] = useState<boolean>(false);

    const addItemSession = (product: Product) => {
        setLoading(true);
        addItemToShoppingCart(product)
            .then(res => setShoppingCart(res))
            .finally(() => setLoading(false));
    }

    const deleteItemSession = (product: Product) => {
        setLoading(true);
        deleteItemFromShoppingCart(product)
            .then(res => setShoppingCart(res))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setLoading(true);
        getShoppingCart()
            .then(res => setShoppingCart(res))
            .finally(() => setLoading(false));
    }, []);

    return { shoppingCart, loading, addItemSession, deleteItemSession };

}