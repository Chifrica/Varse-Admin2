import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

import dashboardIcon from '../../assets/dashboard.png';
import ridersIcon from '../../assets/riderIcon.png';
import vendorsIcon from '../../assets/vendor.png';
import customersIcon from '../../assets/customer.png';
import supportIcon from '../../assets/support.png';
import paymentIcon from '../../assets/payment.png';
import logout from '../../assets/logout.png';
import settings from '../../assets/setting.png';

import logo from '../../assets/logo.png';
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';

interface Order {
    id: string;
    product_id: string;
    buyer_id: string;
    vendor_id: string;
    name: string;
    total_price: string;
    qty: number;
    paid: string;
    created_at: string;
}

const OrderHistory = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/', { replace: true });
    };

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching orders:", error);
            } else {
                setOrders(data);
            }

            setLoading(false);
        };

        fetchOrders();
    }, []);

    return (
        <div className="app">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} className="logo-icon" />
                    <h1>
                        Varse
                    </h1>
                </div>

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/dashboard" end>
                                <img src={dashboardIcon} className="nav-icon" /> Dashboard
                            </NavLink>
                        </li>
                        <li className="active">
                            <NavLink to="/orders">
                                <img src={dashboardIcon} className="nav-icon" /> Order History
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/riders">
                                <img src={ridersIcon} className="nav-icon" /> Riders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/vendors">
                                <img src={vendorsIcon} className="nav-icon" /> Vendors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/customers">
                                <img src={customersIcon} className="nav-icon" /> Customers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/support">
                                <img src={supportIcon} className="nav-icon" /> Support
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/payment">
                                <img src={paymentIcon} className="nav-icon" /> Payment
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <div className="footer-item">
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/setting">
                                        <img src={settings} className="nav-icon" /> Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout" onClick={handleLogout}>
                                        <img src={logout} className="nav-icon" /> Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="main">
                {/* Top stats */}
                <div className="topbar">
                    <div className="topbar-actions">
                        <div className="header__search">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search orders, customers, or rider"
                            />
                        </div>
                        <div className="header__admin">
                            <div className="header__profile">👤</div>

                            <div className="header__admin-info">
                                <h3>Admin User</h3>
                                <p>Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professionalized Order History Section */}
                <div className="order-history-header">
                    <h2>Order History</h2>

                    <div className="filter-bar">
                        <span className="filter-label">Filters</span>
                        <div className="filter-group">
                            <label>Order Types: <span className="highlight">All</span></label>
                            <FontAwesomeIcon icon={faChevronDown} className="filter-icon" />
                            <select>
                                <option>All</option>
                                <option>Order ID</option>
                                <option>Buyer ID</option>
                                <option>Vendor ID</option>
                                <option>Product Name</option>
                                <option>Total Price</option>
                                <option>Quantity</option>
                                <option>Date-Time</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Status: <span className="highlight">Active</span></label>
                            <FontAwesomeIcon icon={faChevronDown} className="filter-icon" />
                            <select><option>Active</option></select>
                        </div>

                        <div className="filter-group">
                            <label>Date: <span className="highlight">This Month</span></label>
                            <FontAwesomeIcon icon={faChevronDown} className="filter-icon" />
                            <select><option>This Month</option></select>
                        </div>
                    </div>
                </div>

                <div className="table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Buyers ID</th>
                                <th>Vendor ID</th>
                                <th>Product Name</th>
                                <th>Total Price</th>
                                <th>Date-Time</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={8}>Loading orders...</td>
                                </tr>
                            )}
                            {orders.map((order) => {
                                if (!order.id) return null;

                                return (
                                    <tr key={order.id}>
                                        <td>{order.product_id}</td>
                                        <td>{order.buyer_id}</td>
                                        <td>{order.vendor_id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.total_price}</td>
                                        <td>{new Date(order.created_at).toLocaleString()}</td>
                                        <td>{order.qty}</td>
                                        <td>
                                            <span className={`status-pill ${order.paid ?? 'unknown'}`}>
                                                {order.paid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default OrderHistory;