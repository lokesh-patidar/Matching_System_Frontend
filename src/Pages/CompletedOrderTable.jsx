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
import { getCompleteOrder } from "../Redux/action";

const CompletedOrderTable = () => {

    const dispatch = useDispatch();
    const completeOrder = useSelector((store) => store.completeOrder);

    useEffect(() => {
        if (completeOrder.length === 0) {
            dispatch(getCompleteOrder());
        };
    }, [dispatch, completeOrder, completeOrder.length]);

    return (
        <Box width="80%" margin="auto">
            <Text>Complete Order Table</Text>
            <Box>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th border="1px solid black">Price</Th>
                                <Th border="1px solid black">Qty</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                completeOrder.length === 0 ? (
                                    <Tr>
                                        <Td>Loading...</Td>
                                    </Tr>
                                ) : (
                                    completeOrder.slice(0, 5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td border="1px solid black">{item.Qty}</Td>
                                                <Td border="1px solid black">{item.Price}</Td>
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

export { CompletedOrderTable };