// import React, { useState } from 'react';
// import { Box, Button, FormControl, FormLabel, Input, Stack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

// const initialPendingOrders = [  { id: 1, buyerQty: 10, buyerPrice: 99, sellerPrice: 100, sellerQty: 20 },  { id: 2, buyerQty: 50, buyerPrice: 98, sellerPrice: 101, sellerQty: 20 },  { id: 3, buyerQty: 70, buyerPrice: 97, sellerPrice: 102, sellerQty: 130 },  { id: 4, buyerQty: 80, buyerPrice: 96, sellerPrice: 103, sellerQty: 150 },  { id: 5, buyerQty: 10, buyerPrice: 96, sellerPrice: 104, sellerQty: 70 },];

// const initialCompletedOrders = [  { id: 1, price: 100, qty: 20 },];

// function App() {
//   const [pendingOrders, setPendingOrders] = useState(initialPendingOrders);
//   const [completedOrders, setCompletedOrders] = useState(initialCompletedOrders);
//   const [newOrder, setNewOrder] = useState({ buyerQty: '', buyerPrice: '', sellerPrice: '', sellerQty: '' });

//   const handleNewOrderChange = (event) => {
//     setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
//   };

//   const handleNewOrderSubmit = () => {
//     const newId = pendingOrders.length + 1;
//     const newOrderObject = { id: newId, ...newOrder };

//     setPendingOrders([...pendingOrders, newOrderObject]);
//     setNewOrder({ buyerQty: '', buyerPrice: '', sellerPrice: '', sellerQty: '' });
//   };

//   const handleOrderMatch = (order) => {
//     setPendingOrders(pendingOrders.filter((pendingOrder) => pendingOrder.id !== order.id));
//     setCompletedOrders([...completedOrders, { price: order.buyerPrice, qty: order.buyerQty }]);
//   };

//   return (
//     <Box p={4}>
//       <Stack spacing={4}>
//         <Box>
//           <Table>
//             <Thead>
//               <Tr>
//                 <Th>Buyer Qty</Th>
//                 <Th>Buyer Price</Th>
//                 <Th>Seller Price</Th>
//                 <Th>Seller Qty</Th>
//                 <Th>Action</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {pendingOrders.map((order) => (
//                 <Tr key={order.id}>
//                   <Td>{order.buyerQty}</Td>
//                   <Td>{order.buyerPrice}</Td>
//                   <Td>{order.sellerPrice}</Td>
//                   <Td>{order.sellerQty}</Td>
//                   <Td>
//                     {order.buyerPrice === order.sellerPrice && order.buyerQty === order.sellerQty ? (
//                       <Button size="sm" onClick={() => handleOrderMatch(order)}>Match</Button>
//                     ) : null}
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>

//         <Box>
//           <FormControl>
//             <FormLabel>Buyer Qty</FormLabel>
//             <Input type="number" name="buyerQty" value={newOrder.buyerQty} onChange={handleNewOrder
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr
// } from "@chakra-ui/react";

// function App() {
//   const [pendingOrders, setPendingOrders] = useState([
//     { buyerQty: 10, buyerPrice: 99, sellerPrice: 100, sellerQty: 20 },
//     { buyerQty: 50, buyerPrice: 98, sellerPrice: 101, sellerQty: 20 },
//     { buyerQty: 70, buyerPrice: 97, sellerPrice: 102, sellerQty: 130 },
//     { buyerQty: 80, buyerPrice: 96, sellerPrice: 103, sellerQty: 150 },
//     { buyerQty: 10, buyerPrice: 96, sellerPrice: 104, sellerQty: 70 }
//   ]);

//   const [completedOrders, setCompletedOrders] = useState([
//     { price: 100, qty: 20 }
//   ]);

//   const [newOrder, setNewOrder] = useState({
//     buyerQty: "",
//     buyerPrice: "",
//     sellerPrice: "",
//     sellerQty: ""
//   });

//   const handleInputChange = (event) => {
//     setNewOrder({
//       ...newOrder,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // Add the new order to the pending orders list
//     setPendingOrders([...pendingOrders, newOrder]);

//     // Check if there are any matching orders in the pending orders list
//     const matchingOrderIndex = pendingOrders.findIndex(
//       (order) => order.buyerPrice === newOrder.sellerPrice
//     );

//     if (matchingOrderIndex !== -1) {
//       // There is a matching order, so create a completed order
//       const matchingOrder = pendingOrders[matchingOrderIndex];

//       const completedOrder = {
//         price: matchingOrder.buyerPrice,
//         qty: Math.min(matchingOrder.buyerQty, newOrder.sellerQty)
//       };

//       // Update the completed orders list
//       setCompletedOrders([...completedOrders, completedOrder]);

//       // Update the remaining quantities in the pending orders list
//       const updatedPendingOrders = [...pendingOrders];

//       if (matchingOrder.buyerQty > newOrder.sellerQty) {
//         updatedPendingOrders[matchingOrderIndex].buyerQty -= newOrder.sellerQty;
//         updatedPendingOrders[matchingOrderIndex].sellerPrice = newOrder.sellerPrice;
//         updatedPendingOrders[matchingOrderIndex].sellerQty -= newOrder.sellerQty;
//       } else if (matchingOrder.buyerQty < newOrder.sellerQty) {
//         updatedPendingOrders.splice(matchingOrderIndex, 1);
//         updatedPendingOrders.push({
//           buyerQty: newOrder.sellerQty - matchingOrder.buyerQty,
//           buyerPrice: newOrder.buyerPrice,
//           sellerPrice: matchingOrder.sellerPrice,
//           sellerQty: matchingOrder.sellerQty - newOrder.sellerQty
//         });
//       } else {
//         updatedPendingOrders.splice(matchingOrderIndex, 1);
//       }

//       setPendingOrders(updatedPendingOrders);
//     }

//     // Reset the form inputs
//     setNewOrder({
//       buyerQty: "",
//       buyerPrice: "",
//       sellerPrice: "",
//       sellerQty: ""
//     });
//   };

//   return (
//     <Box p={4}>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr
// } from "@chakra-ui/react";

// function App() {
//   const [pendingOrders, setPendingOrders] = useState([
//     { buyerQty: 10, buyerPrice: 99, sellerPrice: 100, sellerQty: 20 },
//     { buyerQty: 50, buyerPrice: 98, sellerPrice: 101, sellerQty: 20 },
//     { buyerQty: 70, buyerPrice: 97, sellerPrice: 102, sellerQty: 130 },
//     { buyerQty: 80, buyerPrice: 96, sellerPrice: 103, sellerQty: 150 },
//     { buyerQty: 10, buyerPrice: 96, sellerPrice: 104, sellerQty: 70 }
//   ]);

//   const [completedOrders, setCompletedOrders] = useState([
//     { price: 100, qty: 20 }
//   ]);

//   const [newOrder, setNewOrder] = useState({
//     buyerQty: "",
//     buyerPrice: "",
//     sellerPrice: "",
//     sellerQty: ""
//   });

//   const handleInputChange = (event) => {
//     setNewOrder({
//       ...newOrder,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // Add the new order to the pending orders list
//     setPendingOrders([...pendingOrders, newOrder]);

//     // Check if there are any matching orders in the pending orders list
//     const matchingOrderIndex = pendingOrders.findIndex(
//       (order) => order.buyerPrice === newOrder.sellerPrice
//     );

//     if (matchingOrderIndex !== -1) {
//       // There is a matching order, so create a completed order
//       const matchingOrder = pendingOrders[matchingOrderIndex];

//       const completedOrder = {
//         price: matchingOrder.buyerPrice,
//         qty: Math.min(matchingOrder.buyerQty, newOrder.sellerQty)
//       };

//       // Update the completed orders list
//       setCompletedOrders([...completedOrders, completedOrder]);

//       // Update the remaining quantities in the pending orders list
//       const updatedPendingOrders = [...pendingOrders];

//       if (matchingOrder.buyerQty > newOrder.sellerQty) {
//         updatedPendingOrders[matchingOrderIndex].buyerQty -= newOrder.sellerQty;
//         updatedPendingOrders[matchingOrderIndex].sellerPrice = newOrder.sellerPrice;
//         updatedPendingOrders[matchingOrderIndex].sellerQty -= newOrder.sellerQty;
//       } else if (matchingOrder.buyerQty < newOrder.sellerQty) {
//         updatedPendingOrders.splice(matchingOrderIndex, 1);
//         updatedPendingOrders.push({
//           buyerQty: newOrder.sellerQty - matchingOrder.buyerQty,
//           buyerPrice: newOrder.buyerPrice,
//           sellerPrice: matchingOrder.sellerPrice,
//           sellerQty: matchingOrder.sellerQty - newOrder.sellerQty
//         });
//       } else {
//         updatedPendingOrders.splice(matchingOrderIndex, 1);
//       }

//       setPendingOrders(updatedPendingOrders);
//     }

//     // Reset the form inputs
//     setNewOrder({
//       buyerQty: "",
//       buyerPrice: "",
//       sellerPrice: "",
//       sellerQty: ""
//     });
//   };

//   return (
//     <Box p={4}>
//       <Table variant="simple">
//         <Thead>
//           <Tr>
//             <Th
// import { useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   SimpleGrid,
//   Table,
//   TableCaption,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
// } from "@chakra-ui/react";

// function App() {
//   const [buyerQty, setBuyerQty] = useState("");
//   const [buyerPrice, setBuyerPrice] = useState("");
//   const [sellerPrice, setSellerPrice] = useState("");
//   const [sellerQty, setSellerQty] = useState("");
//   const [pendingOrders, setPendingOrders] = useState([
//     { buyerQty: 10, buyerPrice: 99, sellerPrice: 100, sellerQty: 20 },
//     { buyerQty: 50, buyerPrice
