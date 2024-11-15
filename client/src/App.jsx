import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import { Routes, Route, useLocation } from "react-router-dom";  // Import useLocation
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';

function App() {
  const location = useLocation();  // Get current location to detect route

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
