import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./(auth)/login";
import OrderManagement from "./components/order-management";
import PaymentPage from "./components/payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;