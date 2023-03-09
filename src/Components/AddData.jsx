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

      if (checkedItem && checkedItem.Type === pendingState.Type) {
        dispatch(updatePending(checkedItem._id, pendingState))
          .then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
      }

      if (checkedItem && pendingState.Type === "Buyer") {
        console.log("inside buyer");
        if (checkedItem.Price === pendingState.Price && checkedItem.Qty === pendingState.Qty && checkedItem.Type === "Seller") {
          dispatch(addCompleteOrder(pendingState));
          dispatch(deletePending(checkedItem._id))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            })
        }
        else if (checkedItem.Price === pendingState.Price && checkedItem.Qty < pendingState.Qty && checkedItem.Type === "Seller") {
          let newQty = pendingState.Qty - checkedItem.Qty;
          let newPendingState = {
            Type: pendingState.Type,
            Qty: newQty,
            Price: pendingState.Price
          };
          let newCompleteState = {
            Type: pendingState.Type,
            Qty: checkedItem.Qty,
            Price: pendingState.Price
          };
          console.log("new Buyer PendingState1:", newPendingState);
          // dispatch(updatePending(checkedItem._id, newPendingState));
          dispatch(deletePending(checkedItem._id));
          dispatch(addPending(newPendingState));
          dispatch(addCompleteOrder(newCompleteState))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            })
        }
        else if (checkedItem.Price === pendingState.Price && checkedItem.Qty > pendingState.Qty && checkedItem.Type === "Seller") {
          let newQty = checkedItem.Qty - pendingState.Qty;
          let newPendingState = {
            Type: "Seller",
            Qty: newQty,
            Price: pendingState.Price
          };
          let newCompleteState = {
            Type: pendingState.Type,
            Qty: pendingState.Qty,
            Price: pendingState.Price
          };
          console.log("new Seller PendingState1:", newPendingState);
          dispatch(updatePending(checkedItem._id, newPendingState));
          dispatch(addCompleteOrder(newCompleteState))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            });
        }
      }
      else if (checkedItem && pendingState.Type === "Seller") {
        if (checkedItem.Price === pendingState.Price && checkedItem.Qty === pendingState.Qty && checkedItem.Type === "Buyer") {
          dispatch(addCompleteOrder(pendingState));
          dispatch(deletePending(checkedItem._id))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            })
        }
        else if (checkedItem.Price === pendingState.Price && checkedItem.Qty < pendingState.Qty && checkedItem.Type === "Buyer") {
          let newQty = pendingState.Qty - checkedItem.Qty;
          let newPendingState = {
            Type: pendingState.Type,
            Qty: newQty,
            Price: pendingState.Price
          };
          let newCompleteState = {
            Type: pendingState.Type,
            Qty: checkedItem.Qty,
            Price: pendingState.Price
          };
          console.log("new seller PendingState2:", newPendingState);
          // dispatch(updatePending(checkedItem._id, newPendingState));
          dispatch(deletePending(checkedItem._id));
          dispatch(addPending(newPendingState));
          dispatch(addCompleteOrder(newCompleteState))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            });
        }
        else if (checkedItem.Price === pendingState.Price && checkedItem.Qty > pendingState.Qty && checkedItem.Type === "Buyer") {
          let newQty = checkedItem.Qty - pendingState.Qty;
          let newPendingState = {
            Type: "Buyer",
            Qty: newQty,
            Price: pendingState.Price
          };
          let newCompleteState = {
            Type: pendingState.Type,
            Qty: pendingState.Qty,
            Price: pendingState.Price
          };
          console.log("new buyer PendingState2:", newPendingState);
          dispatch(updatePending(checkedItem._id, newPendingState))
          dispatch(addCompleteOrder(newCompleteState))
            .then(() => {
              dispatch(getPending());
              dispatch(getCompleteOrder());
            });
        }
      }
      else {
        console.log("else");
        dispatch(addPending(pendingState))
          .then(() => {
            dispatch(getPending());
            dispatch(getCompleteOrder());
          });
      }
      dispatch(getPending());
      dispatch(getCompleteOrder())
        .then(() => setPendingState({ type: "reset" }));

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