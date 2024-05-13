import React from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { formatPrice } from "../../utils";
import useProducts from "../hooks/useProducts";
import { Product } from "../api/productApi";

export default function ProductGrid({ shoppingCart, addItemSession }): React.JSX.Element {

    const products = useProducts();

    const handleProductLabel = (product: Product) => {
        const productInShoppingCart = shoppingCart?.items?.find(item => item.product.id === product.id);
        return productInShoppingCart ? `${ productInShoppingCart.quantity } x` : 'Ajouter au panier';
    }

    return (
        <Container>
            <Grid container marginTop={5}>
                {
                    products?.map(product => (
                        <Grid item key={ product.id } xs={4}>
                            <Box sx={{ width: 300, m: 2 }}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Stack direction="column" spacing={2}>
                                        <Box 
                                            component='img'
                                            sx={{ width: '100%', height: '400px'}} 
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
        </Container>
    )
}