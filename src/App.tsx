// import Login from './(auth)/login'
// import './App.css'
// import OrderManagement from './components/order-management'

// function App() {

//   return (
//     <>
//       {/* <OrderManagement /> */}

//       <Login />
//     </>
//   )
// }

// export default App


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./(auth)/login";
import OrderManagement from "./components/order-management";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/orders" element={<OrderManagement />} />
      </Routes>
    </Router>
  );
}

export default App;