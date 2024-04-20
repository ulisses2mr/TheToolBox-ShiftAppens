import './App.css';
import { Routes, Route } from 'react-router-dom';
import Offers from './Offers/Offers';

import { BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/offers" element={<Offers/>} />
      </Routes>
    </BrowserRouter>
  );
};

