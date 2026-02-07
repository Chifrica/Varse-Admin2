import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import activeUser from '../../assets/activeUser.png'
import activeVendor from '../../assets/activeVendors.png'
import totalUser from '../../assets/totalUser.png'
import monthlyRevenue from '../../assets/monthlyRevenue.png'
import { NavLink } from 'react-router-dom';

import dashboardIcon from '../../assets/dashboard.png';
import ridersIcon from '../../assets/riderIcon.png';
import vendorsIcon from '../../assets/vendor.png';
import customersIcon from '../../assets/customer.png';
import supportIcon from '../../assets/support.png';
import paymentIcon from '../../assets/payment.png';
import logout from '../../assets/logout.png';
import settings from '../../assets/setting.png';

import logo from '../../assets/logo.png';

interface StatProps {
    title: string;
    value: string;
    change: string;
    danger?: boolean;
    icon?: string;
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

const Dashboard = () => {
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
                        <li className="active">
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
                        <li>
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
                    <Stat title="Total User" value="40,689" change="+8.5% Up from yesterday" icon={totalUser} />
                    <Stat title="Active Buyers" value="10,293" change="+1.3% Up from past week" icon={activeUser} />
                    <Stat title="Active Vendors" value="5,500" change="-4.3% Down from yesterday" danger icon={activeVendor} />
                    <Stat title="Monthly Revenue" value="$92,040" change="+1.8% Up from yesterday" icon={monthlyRevenue} />
                </div>

                <section className="card revenue-card">
                    <div className="revenue-header">
                        <h3>Revenue Details</h3>
                        <select className="revenue-filter">
                            <option>December</option>
                            <option>November</option>
                            <option>October</option>
                            <option>September</option>
                            <option>August</option>
                            <option>July</option>
                            <option>June</option>
                            <option>May</option>
                            <option>April</option>
                            <option>March</option>
                            <option>February</option>
                            <option>January</option>
                        </select>
                    </div>

                    <div className="chart-main-layout">
                        {/* Y-Axis Labels */}
                        <div className="y-axis">
                            <span>sun</span>
                            <span>Sat</span>
                            <span>Fri</span>
                            <span>Thur</span>
                            <span>Wed</span>
                            <span>Tue</span>
                            <span>Mon</span>
                        </div>

                        <div className="chart-content">
                            <div className="chart-wrapper">
                                <svg viewBox="0 0 800 260" className="revenue-chart" preserveAspectRatio="none">
                                    {/* Background Grid Lines */}
                                    {[...Array(8)].map((_, i) => (
                                        <line key={i} x1="0" y1={i * 37} x2="800" y2={i * 37} stroke="#f0f0f0" strokeWidth="1" />
                                    ))}

                                    {/* Area */}
                                    <path
                                        d="M0 220 L50 210 L100 180 L150 190 L200 140 L250 200 L300 160 L350 170 L400 210 L450 150 L500 160 L550 140 L600 155 L650 165 L700 150 L750 160 L800 145 L800 260 L0 260 Z"
                                        fill="rgba(255, 136, 0, 0.12)"
                                    />

                                    {/* Line */}
                                    <path
                                        d="M0 220 L50 210 L100 180 L150 190 L200 140 L250 200 L300 160 L350 170 L400 210 L450 150 L500 160 L550 140 L600 155 L650 165 L700 150 L750 160 L800 145"
                                        fill="none"
                                        stroke="#ff8800"
                                        strokeWidth="2"
                                    />

                                    <circle cx="200" cy="140" r="4" fill="#ff8800" />
                                </svg>
                                <div className="chart-tooltip">64,366.77</div>
                            </div>

                            {/* X-Axis Labels */}
                            <div className="x-axis">
                                <span>5k</span>
                                <span>10k</span>
                                <span>15k</span>
                                <span>20k</span>
                                <span>25k</span>
                                <span>30k</span>
                                <span>35k</span>
                                <span>40k</span>
                                <span>45k</span>
                                <span>50k</span>
                                <span>55k</span>
                                <span>60k</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;