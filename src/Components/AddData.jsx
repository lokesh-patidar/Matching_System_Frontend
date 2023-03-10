import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompleteOrder, addPending, deletePending, getCompleteOrder, getPending, updatePending } from '../Redux/action';


const initialState = {
  Type: "",
  Qty: "",
  Price: "",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "Type":
      return {
        ...state,
        Type: action.payload,
      };

    case "Qty":
      return {
        ...state,
        Qty: Number(action.payload),
      };

    case "Price":
      return {
        ...state,
        Price: Number(action.payload),
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const AddData = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [pendingState, setPendingState] = useReducer(
    Reducer,
    initialState
  );

  const pendingOrderData = useSelector(store => store.pendingOrder);

  const AddHandler = (pendingState, onClose) => {

    if (pendingState.Type !== "" && pendingState.Qty !== "" && pendingState.Price !== "") {
      console.log("pending state:- ", pendingState);
      let checkedItem = pendingOrderData.find((item) => item.Price === pendingState.Price);

      if (checkedItem && pendingState.Type === "Buyer" && checkedItem.Type === "Seller") {
        if (checkedItem.Qty < pendingState.Qty) {
          let newState = {
            Type: pendingState.Type,
            Qty: checkedItem.Qty,
            Price: checkedItem.Price
          };
          console.log("Buyer:--- if pending qty is greater than cheked");
          let newBuyerData = {
            Type: pendingState.Type,
            Qty: pendingState.Qty - checkedItem.Qty,
            Price: checkedItem.Price
          }
          console.log("newState",newState);
          console.log("newBuyerData",newBuyerData);
          dispatch(addCompleteOrder(newState));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
          // let sellerMin = localStorage.getItem("sellerMin");
          // if(newBuyerData.Price <= sellerMin){
          //   console.log("newbuyer price is less then or equals to sellerMin");
          //   console.log("new buyer added");
          //   dispatch(addPending(newBuyerData));
          // }
        }
        else if (checkedItem.Qty > pendingState.Qty) {
          let newState = {
            Type: pendingState.Type,
            Qty: pendingState.Qty,
            Price: checkedItem.Price
          };
          console.log("Buyer:--- if pending qty is lesser than cheked");
          dispatch(addCompleteOrder(newState));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
        else {
          console.log("Buyer:--- qty is equal");
          dispatch(addCompleteOrder(pendingState));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
      }
      else if (checkedItem && pendingState.Type === "Seller" && checkedItem.Type === "Buyer") {
        if (checkedItem.Qty < pendingState.Qty) {
          let newState = {
            Type: pendingState.Type,
            Qty: checkedItem.Qty,
            Price: checkedItem.Price
          };
          // let newQty = pendingState.Qty - checkedItem.Qty;
          // let newSellerData = {
          //   Type: pendingState.Type,
          //   Qty: newQty,
          //   Price: checkedItem.Price
          // }
          console.log("Seller:--- if pending qty is greater than cheked")
          console.log("newState",newState);
          dispatch(addCompleteOrder(newState));
          // dispatch(addPending(newSellerData));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
        else if (checkedItem.Qty > pendingState.Qty) {
          let newState = {
            Type: pendingState.Type,
            Qty: pendingState.Qty,
            Price: checkedItem.Price
          };
          console.log("Seller:--- if pending qty is lesser than cheked")
          console.log("newState",newState);
          dispatch(addCompleteOrder(newState));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
        else {
          console.log(pendingState);
          dispatch(addCompleteOrder(pendingState));
          dispatch(deletePending(checkedItem._id)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
      }
      else if (checkedItem && pendingState.Type === "Seller" && checkedItem.Type === "Seller") {
        console.log("update seller");
        dispatch(updatePending(checkedItem._id, pendingState)).then(() => {
          dispatch(getPending());
          dispatch(getCompleteOrder());
        });
      }
      else if (checkedItem && pendingState.Type === "Buyer" && checkedItem.Type === "Buyer") {
        console.log("update buyer");
        dispatch(updatePending(checkedItem._id, pendingState)).then(() => {
          dispatch(getPending());
          dispatch(getCompleteOrder());
        });
      }
      else {

        console.log("pendigstate", pendingState);
        let buyerMax = localStorage.getItem("buyerMax");
        let sellermin = localStorage.getItem("sellerMin");

        if(pendingState.Type === "Seller" && buyerMax < pendingState.Price){
          dispatch(addPending(pendingState)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
        else if(pendingState.Type === "Buyer" && sellermin > pendingState.Price){
          dispatch(addPending(pendingState)).then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
        }
        else{
          toast({
            title: "Data !",
            description: "Data can not be added!.",
            status: "warning",
            duration: 2000,
            position: "top",
            isClosable: true,
            render: () => (
              <Box
                border="1px solid green"
                textAlign="center"
                borderRadius="10px"
                fontWeight="bolder"
                color="white"
                p={3}
                bg="red.500"
                boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
              >
                {`Price overlapping!!`}
              </Box>
            ),
          })
          setTimeout(() => setPendingState({ type: "reset" }), 500);
        }
      }


      dispatch(getPending());
      dispatch(getCompleteOrder()).then(() => setPendingState({ type: "reset" }));
    }
    else {
      toast({
        title: "Data !",
        description: "Data can not be added!.",
        status: "warning",
        duration: 2000,
        position: "top",
        isClosable: true,
        render: () => (
          <Box
            border="1px solid green"
            textAlign="center"
            borderRadius="10px"
            fontWeight="bolder"
            color="white"
            p={3}
            bg="red.500"
            boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
          >
            {`All fields are not there!`}
          </Box>
        ),
      })
      setTimeout(() => setPendingState({ type: "reset" }), 500);
    }
    onClose();
  };

  useEffect(() => {
    if (pendingOrderData.length === 0) {
      dispatch(getPending());
    }
  }, [dispatch, pendingOrderData, pendingOrderData.length]);


  // useEffect(() => {
  //    console.log("buyerMax", localStorage.getItem("buyerMax"));
  //    console.log("sellerMax", localStorage.getItem("sellerMax"));
  // },[])

  return (
    <>
      <Button marginTop="2%" onClick={onOpen} colorScheme="teal">Add Data</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Buyer Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Available or not</FormLabel>
              <Select
                placeholder="Select option"
                value={pendingState.Type}
                onChange={(e) =>
                  setPendingState({ type: "Type", payload: e.target.value })
                }
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Qty</FormLabel>
              <Input
                type={"number"}
                placeholder="Qty"
                value={pendingState.Qty}
                onChange={(e) =>
                  setPendingState({ type: "Qty", payload: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type={"number"}
                placeholder="Price"
                value={pendingState.Price}
                onChange={(e) =>
                  setPendingState({ type: "Price", payload: e.target.value })
                }
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={() => AddHandler(pendingState, onClose)}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export { AddData };