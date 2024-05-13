import React from "react";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { ShoppingCartItem } from "../api/shoppingCartApi";
import { formatPrice } from "../../utils";

export default function ShoppingCartTable({ shoppingCart, deleteItemSession }): React.JSX.Element {

    return (
        <TableContainer component={ Paper }>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Produit</TableCell>
                        <TableCell>Quantité</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        shoppingCart?.items.map((item: ShoppingCartItem) => (
                            <TableRow key={ item.product.id }>
                                <TableCell>
                                    <Box display="flex" flexDirection="row"  alignItems="center">
                                        <img 
                                            style={{ marginRight: '10px' }}
                                            width={100} 
                                            height={100} 
                                            src={`/images/products/${ item.product.imageName }`} 
                                            alt={ item.product.name } 
                                        />
                                        <span>{ item.product.name }</span>
                                    </Box>
                                </TableCell>
                                <TableCell>{ item.quantity }</TableCell>
                                <TableCell>{ formatPrice(item.product.price) }</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteItemSession(item.product)}>
                                        <ClearIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}