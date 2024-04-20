import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import { BrowserRouter} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

