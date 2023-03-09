import { Box } from '@chakra-ui/react';
import './App.css';
import { AddData } from './Components/AddData';
import { CompletedOrderTable } from './Pages/CompletedOrderTable';
import { PendingOrderTable } from './Pages/PendingOrderTable';

function App() {
  return (
    <div className="App">
      <Box>
        <AddData/>
      </Box>
      <PendingOrderTable />
      <CompletedOrderTable />
    </div>
  );
}

export default App;
