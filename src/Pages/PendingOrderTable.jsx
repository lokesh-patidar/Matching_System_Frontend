import { Box, Text } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuyer, getSeller } from "../Redux/action";

const PendingOrderTable = () => {

    const dispatch = useDispatch();
    const buyerData = useSelector(store => store.buyers);
    const sellerData = useSelector(store => store.sellers);


    useEffect(() => {
        if(buyerData.length === 0){
            dispatch(getBuyer());
        }
    },[dispatch, buyerData, buyerData.length]);

    useEffect(() => {
        if (sellerData.length === 0) {
            dispatch(getSeller());
        }
    }, [dispatch, sellerData, sellerData.length]);

    return (
        <Box width="80%" margin="auto">
            <Text>Pending Order Table</Text>
            <Box display="flex">
                <TableContainer width="50%">
                    <Table variant='simple'>
                        <Thead>
                            <Tr border="1px solid black">
                                <Th border="1px solid black">Buyer Qty</Th>
                                <Th border="1px solid black">Buyer Price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                buyerData.length === 0 ? (
                                    <Tr>
                                        <Td>Loading...</Td>
                                    </Tr>
                                ) : (
                                    buyerData.slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td border="1px solid black">{item.BuyerQty}</Td>
                                                <Td border="1px solid black">{item.BuyerPrice}</Td>
                                            </Tr>
                                        );
                                    })
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>


                <TableContainer width="50%">
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th border="1px solid black">Seller Price</Th>
                                <Th border="1px solid black">Seller Qty</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                sellerData.length === 0 ? (
                                    <Tr>
                                        <Td>Loading...</Td>
                                    </Tr>
                                ) : (
                                    sellerData.slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td border="1px solid black">{item.SellerPrice}</Td>
                                                <Td border="1px solid black">{item.SellerQty}</Td>
                                            </Tr>
                                        );
                                    })
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export { PendingOrderTable };