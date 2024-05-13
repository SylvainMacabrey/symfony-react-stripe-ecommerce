import React from "react";
import { AppBar, Badge, Grid, IconButton, Toolbar } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { visit } from "../../utils";
import { ShoppingCartItem } from "../api/shoppingCartApi";

export default function Header({ shoppingCart }): React.JSX.Element {

    const showHome = ():void => {
        visit('/');
    }

    const showShoppingCart = ():void => {
        visit('/shopping-cart');
    }

    const calculateTotalQuantity = () => {
        return shoppingCart?.items.map((item: ShoppingCartItem) => item.quantity).reduce((a, b) => a + b, 0);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="space-between" alignContent="center" style={{ width: '100%' }}>
                    <Grid item>
                        <IconButton color="inherit" onClick={ showHome }>
                            <StoreIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" onClick={ showShoppingCart }>
                            <Badge badgeContent={ calculateTotalQuantity() } color="secondary">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}