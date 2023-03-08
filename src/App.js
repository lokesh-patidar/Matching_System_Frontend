import './App.css';
import { CompletedOrderTable } from './Pages/CompletedOrderTable';
import { PendingOrderTable } from './Pages/PendingOrderTable';

function App() {
  return (
    <div className="App">
      <PendingOrderTable />
      <CompletedOrderTable />
    </div>
  );
}

export default App;
