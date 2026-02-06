import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./(auth)/login";
import OrderManagement from "./components/order-management";
import PaymentPage from "./components/payment";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/riders" element={<h1>Riders</h1>} />
        <Route path="/vendors" element={<h1>Vendors</h1>} />
        <Route path="/customers" element={<h1>Customers</h1>} />
        <Route path="/support" element={<h1>Support</h1>} />
      </Routes>
    </Router>
  );
}

export default App;