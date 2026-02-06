import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';

const OrderHistory = () => {
    return (
        <div className="app">
            {/* Sidebar */}
            <aside className="sidebar">
                <h1 className="logo">Varse</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/dashboard" end>Dashboard</NavLink>
                        </li>
                        <li className="active">
                            <NavLink to="/orders">Order History</NavLink>
                        </li>
                        <li>
                            <NavLink to="/riders">Riders</NavLink>
                        </li>
                        <li>
                            <NavLink to="/vendors">Vendors</NavLink>
                        </li>
                        <li>
                            <NavLink to="/customers">Customers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/support">Support</NavLink>
                        </li>
                        <li>
                            <NavLink to="/payment">Payment</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">Settings<br />Logout</div>
            </aside>

            {/* Main */}
            <main className="main">
                {/* Top stats */}

                {/* Add search icon, notification icon, admin profile icon, [(horizontal to each other)admin name, admin] */}
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
                                <option>Category</option>
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
                                <th>Category</th>
                                <th>Date-Time</th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(10)].map((_, i) => (
                                <tr key={i}>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td>0001RD</td>
                                    <td><span className="status-pill paid">Paid</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>

        </div>
    );
}

export default OrderHistory;