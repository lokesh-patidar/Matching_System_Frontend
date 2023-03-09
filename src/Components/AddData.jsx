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
} from '@chakra-ui/react';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPending } from '../Redux/action';


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
    default:
      return state;
  }
};

const AddData = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [pendingState, setPendingState] = useReducer(
    Reducer,
    initialState
  );

    const pendingOrderData = useSelector(store => store.pendingOrder);

    const AddHandler = (pendingState) => {
      let checkedItem = pendingOrderData.find((item) => item.Price === pendingState.Price );
      console.log(checkedItem);
    };

    useEffect(() => {
        if (pendingOrderData.length === 0) {
            dispatch(getPending());
        }
    }, [dispatch, pendingOrderData, pendingOrderData.length]);

  return (
    <>
      <Button onClick={onOpen}>Add Buyer Data</Button>

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
            <Button variant='ghost' onClick={() => AddHandler(pendingState)}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export { AddData };