import React from "react";
import { Box, Button, Container, FormControl, Grid, Pagination, PaginationItem, Paper, Stack, TextField, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { formatPrice } from "../../utils";
import useProducts from "../hooks/useProducts";
import { Product } from "../api/productApi";

export default function ProductGrid({ shoppingCart, addItemSession }): React.JSX.Element {

    const { products, page, totalPage, setPage, setName, setPrice } = useProducts();

    const handleProductLabel = (product: Product) => {
        const productInShoppingCart = shoppingCart?.items?.find(item => item.product.id === product.id);
        return productInShoppingCart ? `${ productInShoppingCart.quantity } x` : 'Ajouter au panier';
    }

    const paginationClicked = (page: number) => {
        console.log(page);
        setPage(page);
    }

    const handleChangeName = (e) => {
        setName(e.target.value);
        setPage(1);
    }

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
        setPage(1);
    }

    const pagination = () => {
        let items = [];
        for (let i = 0; i < totalPage; i++) {
            items.push(
                <PaginationItem 
                    key={ i + 1 }
                    color="primary"
                    page={ i + 1 }
                    selected={ i + 1 === page }
                    onClick={() => paginationClicked(i + 1)}
                />
            );
        }
        return items;
    }

    return (
        <Container>
            <Grid container marginTop={5} justifyContent="space-between" alignContent="center" style={{ width: '100%' }}>
                <TextField
                    id="standard-basic" 
                    label="Nom du produit" 
                    variant="filled" 
                    sx={{ m: 1, width: '70ch' }}
                    onChange={(e) => handleChangeName(e) } 
                />
                <TextField
                    id="standard-basic" 
                    label="Prix maximum" 
                    variant="filled" 
                    sx={{ m: 1, width: '70ch' }}
                    onChange={(e) => handleChangePrice(e) } 
                />
            </Grid>
            <Grid container marginTop={5}>
                {
                    products?.map(product => (
                        <Grid item key={ product.id } xs={4}>
                            <Box sx={{ width: 'auto', m: 2 }}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Stack direction="column" spacing={2}>
                                        <Box 
                                            component='img'
                                            sx={{ width: '100%', height: '300px'}} 
                                            src={`/images/products/${ product.imageName }`}
                                        /> 
                                        <Typography variant="h6" gutterBottom>{ product.name }</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Typography variant="h6" color="secondary">{ formatPrice(product.price) }</Typography>
                                        </Box>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            endIcon={<ShoppingBasketIcon />}
                                            onClick={() => addItemSession(product)}
                                        >
                                            { handleProductLabel(product) }
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
            <Grid container marginTop={5} justifyContent="center">
                { pagination() }
            </Grid>
        </Container>
    )
}