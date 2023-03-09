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
        <Box width="70%" margin="auto">
            <Text
                fontSize={{ base: "120%", sm: "150%", md: "170%", lg: "180%", xl: "200%" }}
                padding="2%"
                fontWeight="bold"
                color="darkgreen"
            >Pending Order Table</Text>
            <Box backgroundColor="white" display="flex" flexDirection={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }} padding="2%" boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px">
                <TableContainer width={{ base: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" }}>
                    <Table size='sm' variant='simple'>
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
                                    pendingOrderData.filter((el) => el.Type === "Buyer").reverse().sort((a, b) => b.Price - a.Price).slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td height="fit-content" color="blue" fontWeight="bold" border="1px solid black">{item.Qty}</Td>
                                                <Td color="blue" fontWeight="bold" border="1px solid black">{item.Price}</Td>
                                            </Tr>
                                        );
                                    })
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>


                <TableContainer width={{ base: "100%", sm: "100%", md: "50%", lg: "50%", xl: "50%" }}>
                    <Table size='sm' variant='simple'>
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
                                    pendingOrderData.filter((el) => el.Type === "Seller").reverse().sort((a, b) => a.Price - b.Price).slice(0, 5).map((item) => {
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