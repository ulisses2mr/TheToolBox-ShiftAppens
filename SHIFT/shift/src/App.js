import './App.css';
import { Routes, Route } from 'react-router-dom';
import Offers from './Pages/Offers/Offers.jsx';
import Loan from './Pages/Loan/Loan.jsx';
import Request from './Pages/Request/Request.jsx';



import { BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loan" element={<Loan/>} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/request" element={<Request/>} />
      </Routes>
    </BrowserRouter>
  );
};

