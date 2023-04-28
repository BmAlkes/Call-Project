import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
