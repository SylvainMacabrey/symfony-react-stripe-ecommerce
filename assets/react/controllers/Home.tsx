import React from "react";
import Header from "./Header";
import ProductGrid from "./ProductGrid";
import useShoppingCart from "../hooks/useShoppingCart";

export default function Home(): React.JSX.Element {
    const { shoppingCart, loading, addItemSession, deleteItemSession } = useShoppingCart();

    return (
        <>
            <Header shoppingCart={ shoppingCart } />
            <ProductGrid shoppingCart={ shoppingCart } addItemSession={ addItemSession } />
        </>
    )
}