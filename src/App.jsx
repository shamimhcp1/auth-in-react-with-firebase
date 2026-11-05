import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./page/Home";
import Register from "./page/Register";
import Login from "./page/Login";
import Reset from "./page/Reset";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
