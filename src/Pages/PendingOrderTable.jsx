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
import { getPending } from "../Redux/action";

const PendingOrderTable = () => {

    const dispatch = useDispatch();
    const pendingOrderData = useSelector(store => store.pendingOrder);

    useEffect(() => {
        if (pendingOrderData.length === 0) {
            dispatch(getPending());
        }
    }, [dispatch, pendingOrderData, pendingOrderData.length]);

    return (
        <Box width="80%" margin="auto">
            <Text>Pending Order Table</Text>
            <Box display="flex">
                <TableContainer width="50%">
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th color="black" fontWeight="bold" border="1px solid black">Buyer Qty</Th>
                                <Th color="black" fontWeight="bold" border="1px solid black">Buyer Price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                pendingOrderData.length === 0 ? (
                                    <Tr>
                                        <Td>Loading...</Td>
                                    </Tr>
                                ) : (
                                    pendingOrderData.filter((el) => el.Type === "Buyer").reverse().slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td color="blue" fontWeight="bold" border="1px solid black">{item.Qty}</Td>
                                                <Td color="blue" fontWeight="bold" border="1px solid black">{item.Price}</Td>
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
                                <Th color="black" fontWeight="bold" border="1px solid black" >Seller Price</Th>
                                <Th color="black" border="1px solid black" fontWeight="bold">Seller Qty</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                pendingOrderData.length === 0 ? (
                                    <Tr>
                                        <Td>Loading...</Td>
                                    </Tr>
                                ) : (
                                    pendingOrderData.filter((el) => el.Type === "Seller").reverse().slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td color="red" fontWeight="bold" border="1px solid black">{item.Price}</Td>
                                                <Td color="red" fontWeight="bold" border="1px solid black">{item.Qty}</Td>
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