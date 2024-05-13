import { useEffect, useState } from "react";
import { Product, getProducts } from "../api/productApi";

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts().then(res => {
            setProducts(res)
        });
    }, []);

    return products;
}