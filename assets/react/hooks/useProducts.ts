import { useEffect, useState } from "react";
import { Product, getProducts } from "../api/productApi";

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [price, setPrice] = useState<string>("");

    useEffect(() => {
        getProducts(page, name, price).then(res => {
            setProducts(res.products);
            setTotalPage(res.totalPage);
        });
    }, [page, name, price]);

    return { products, page, totalPage, setPage, setName, setPrice };
}