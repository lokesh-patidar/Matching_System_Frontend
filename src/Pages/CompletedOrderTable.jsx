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
        <Box width="50%" margin="auto">
            <Text
                fontSize={{base: "120%", sm: "130%", md: "140%", lg: "150%", xl: "180%"}}
                padding="1.5%"
                fontWeight="bold"
                color="darkgreen"
            >Complete Order Table</Text>
            <Box>
                <TableContainer backgroundColor="white" padding="2%" boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px">
                    <Table size='sm' variant='simple'>
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
                                    completeOrder.reverse().slice(0,5).map((item) => {
                                        return (
                                            <Tr key={item._id}>
                                                <Td fontWeight="bold" fontSize="80%" border="1px solid black">{item.Qty}</Td>
                                                <Td fontWeight="bold" fontSize="80%" border="1px solid black">{item.Price}</Td>
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