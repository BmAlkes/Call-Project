import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Private from "./routes/Private";
import Profile from "./Pages/Profile";
import Customers from "./Pages/Customers";
import New from "./Pages/New";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route
            path="/customer"
            element={
              <Private>
                <Customers />
              </Private>
            }
          />
          <Route
            path="/new"
            element={
              <Private>
                <New />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
