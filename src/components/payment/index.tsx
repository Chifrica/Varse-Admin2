import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import pendingWallet from '../../assets/pendingWallet.png'
import appRevenue from '../../assets/appRevenue.png'
import riderWallet from '../../assets/riderWallet.png'
import vendorEarning from '../../assets/vendorsEarning.png'
import { NavLink } from "react-router-dom";

import dashboardIcon from '../../assets/dashboard.png';
import ridersIcon from '../../assets/riderIcon.png';
import vendorsIcon from '../../assets/vendor.png';
import customersIcon from '../../assets/customer.png';
import supportIcon from '../../assets/support.png';
import paymentIcon from '../../assets/payment.png';
import logout from '../../assets/logout.png';
import settings from '../../assets/setting.png';

import logo from '../../assets/logo.png';
import bank from '../../assets/bank.png'
import quick from '../../assets/quick.png'

interface StatProps {
    title: string;
    value: string;
    change: string;
    danger?: boolean;
    icon?: string;
    // bgColor?: string;
}

function Stat({ title, value, change, danger, icon }: StatProps) {
    return (
        <div className="stat">
            <div className="stat-content">
                <div className="stat-info">
                    <p className="stat-title">{title}</p>
                    <h2>{value}</h2>
                </div>
                {icon && <img src={icon} alt={title} className="stat-icon" />}
            </div>
            <span className={danger ? "danger" : "success"}>{change}</span>
        </div>
    );
}

function Payment() {
    return (
        <div className="payment">
            <div style={{display: "flex", gap: "15rem", alignItems: "center", paddingTop: '-10rem'}}>
                <div>
                    <p style={{fontSize: "14px", width: '100px'}}><strong>Johnathan Doe</strong></p>
                    <p className="txt">Rider • 2h ago</p>
                </div>
                <span className="amount">₦20,000</span>
            </div>
            <div className="payment-actions">
                <button className="primary">Approve</button>
                <button className="ghost">Reject</button>
            </div>
        </div>
    );
}

type TabType = "All Transactions" | "Riders" | "Customers" | "Vendors";

const PaymentPage = () => {

    const [activeTab, setActiveTab] = useState<TabType>("All Transactions");

    const tablesData = {
        "All Transactions": [
            { id: "Tnxid0123s01", type: "Buyer", amount: "₦10,000", method: "Cash", status: "Completed" },
            { id: "Tnxid0123s02", type: "Buyer", amount: "₦10,000", method: "Transfer", status: "Pending" },
        ],
        Riders: [
            { id: "Rider001", type: "Rider", amount: "₦5,000", method: "Cash", status: "Completed" },
        ],
        Customers: [
            { id: "Customer001", type: "Customer", amount: "₦8,000", method: "Transfer", status: "Pending" },
        ],
        Vendors: [
            { id: "Vendor001", type: "Vendor", amount: "₦15,000", method: "Cash", status: "Completed" },
        ],
    };

    const tabs = Object.keys(tablesData);

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
                        <li>
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
                        <li className="active">
                            <NavLink to="/payment">
                                <img src={paymentIcon} className="nav-icon" /> Payment
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <div className="footer-item">
                        <img src={settings} className="nav-icon" /> Settings
                    </div>
                    <div className="footer-item">
                        <img src={logout} className="nav-icon" /> Logout
                    </div>
                </div>
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
                <div className="stats">
                    <Stat title="App Revenue" value="40,689" change="+8.5% Up from yesterday" icon={appRevenue} />
                    <Stat title="Rider Wallet Balc." value="10,293" change="+1.3% Up from past week" icon={riderWallet} />
                    <Stat title="Vendor Earnings" value="$89,000" change="-4.3% Down from yesterday" danger icon={vendorEarning} />
                    <Stat title="Pending Withdrawals" value="2,040" change="+1.8% Up from yesterday" icon={pendingWallet} />
                </div>

                <div className="content">
                    <section className="card">
                        <div className="payments-header-tabs">
                            {tabs.map((tab) => (
                                <p
                                    key={tab}
                                    className={activeTab === tab ? "tab active" : "tab"}
                                    onClick={() => setActiveTab(tab as TabType)}
                                >
                                    {tab}
                                </p>
                            ))}
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    <th>User Type</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tablesData[activeTab].map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.id}</td>
                                        <td>{row.type}</td>
                                        <td>{row.amount}</td>
                                        <td>{row.method}</td>
                                        <td>{row.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    {/* Right column */}
                    <div className="side-panels">
                        <section className="card">
                            <div style={{ marginTop: '-10px', display: 'flex', alignItems: 'center' }}>
                                <img src={quick} alt="" style={{ marginTop: '-5px' }} />
                                <p style={{ fontSize: '20px', marginTop: '5px', marginBottom: "10px" }}>Quick Refund process</p>
                            </div>
                            <p style={{ fontWeight: '506', fontSize: '15px', color: "#6B7280" }}>Enter Transaction ID to initiate full transaction or reversal </p>
                            <input placeholder="E.g Tnx ..." style={{ color: "#000" }} />
                            <button className="primary">Search transaction</button>
                        </section>

                        <section className="card">
                            <div className="payments-header">
                                <div className="payments-header-icon">
                                    <img src={bank} alt="" style={{ marginTop: '-15px' }} />
                                    <p style={{ fontSize: '20px', marginTop: '0px' }}>Payments Request</p>
                                </div>
                                <span className="badge">Urgent</span>
                            </div>
                            <Payment />
                            <Payment />
                            <a href="#" className="link">View All 24 requests</a>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}


export default PaymentPage;