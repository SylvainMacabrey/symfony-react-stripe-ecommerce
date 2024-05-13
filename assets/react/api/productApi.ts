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

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await axios.get(`/api/products`);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}