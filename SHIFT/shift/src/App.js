import './App.css';
import { Routes, Route } from 'react-router-dom';
import Offers from './Offers/Offers';
import Loan from './Loan/Loan';
import { BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loan" element={<Loan/>} />
        <Route path="/offers" element={<Offers/>} />
      </Routes>
    </BrowserRouter>
  );
};

