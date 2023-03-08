import { Box, Text } from "@chakra-ui/react"
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';

const CompletedOrderTable = () => {
    return (
        <Box width="80%" margin="auto">
            <Text>Complete Order Table</Text>
            <Box>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Imperial to metric conversion factors</TableCaption>
                        <Thead>
                            <Tr>
                                <Th border="1px solid black">Price</Th>
                                <Th border="1px solid black">Qty</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td border="1px solid black">20</Td>
                                <Td border="1px solid black">100</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export { CompletedOrderTable };