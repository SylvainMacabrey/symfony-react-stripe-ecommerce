import React from "react";
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ShoppingCartTable from "./ShoppingCartTable";
import { checkoutSession } from "../api/shoppingCartApi";
import { visit } from "../../utils";

export default function ShoppingCart(): React.JSX.Element {
    const { shoppingCart, deleteItemSession } = useShoppingCart();

    const createCheckoutSession = (): void => {
        checkoutSession().then(res => visit(res['url']));
    }

    return (
        <>
            <Header shoppingCart={ shoppingCart } />
            <Container>
                <Box marginY={5}>
                    <Grid container justifyContent='space-between' alignItems="center">
                        <Grid item>
                            <Typography variant='h5'>Votre panier</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={ createCheckoutSession }>Procéder au paiement</Button>
                        </Grid>
                    </Grid>
                </Box>
                <ShoppingCartTable shoppingCart={ shoppingCart } deleteItemSession={ deleteItemSession } />
            </Container>
        </>
    )
}