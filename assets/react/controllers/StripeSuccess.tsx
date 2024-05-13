import React from "react";
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import { Box, Button, Container, Typography } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { formatPrice, visit } from "../../utils";

export default function StripeSuccess({ amountTotal }): React.JSX.Element {
    return (
        <Container>
            <Box>
                <CheckCircleOutline color="success" />
                <Typography component="h1" variant="h4">
                    Paiement réussi
                </Typography>
                <Typography>
                    Merci pour votre achat de { formatPrice(amountTotal) }
                </Typography>
                <Box marginTop={2}>
                    <Button variant="contained" color="primary" onClick={() => visit("/")}>Retour à la boutique</Button>
                </Box>
            </Box>
        </Container>
    )
}