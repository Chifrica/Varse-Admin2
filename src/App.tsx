import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./(auth)/login";
import OrderManagement from "./components/order-management";
import PaymentPage from "./components/payment";
import Dashboard from "./components/dashboard";
import OrderHistory from "./components/orderHistory";
import Vendor from "./components/vendors";
import Support from "./components/support";
import Rider from "./components/riders";
import Customer from "./components/customers";
import Settings from "./components/setting";

import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/riders" element={<Rider/>} />
        <Route path="/vendors" element={<Vendor />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/support" element={<Support />} />
        <Route path="/setting" element={<Settings />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;