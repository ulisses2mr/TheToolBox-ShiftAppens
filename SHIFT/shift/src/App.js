import './App.css';
import { Routes, Route } from 'react-router-dom';
import Offers from './Offers/Offers';
import Tool from './Tool_Page/Tool_Page';
import { BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tool" element={<Tool/>} />
        <Route path="/offers" element={<Offers/>} />
      </Routes>
    </BrowserRouter>
  );
};

