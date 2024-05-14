const axios = require('axios');

export interface Product {
    active: boolean;
    createdAt: Date;
    description: string;
    id: number;
    imageName: string;
    name: string;
    price: number;
};

export interface ProductResponsePaginate {
    pageActive: number;
    pageLimit: number;
    products: Product[];
    totalCount: number;
    totalPage: number;
}

export async function getProducts(page: number, name: string, price: string): Promise<ProductResponsePaginate> {
    try {
        const response = await axios.get(`/api/products?page=${ page }&name=${ name }&price=${ price }`);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}