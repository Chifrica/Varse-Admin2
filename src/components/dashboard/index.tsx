import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import activeUser from '../../assets/activeUser.png'
import activeVendor from '../../assets/activeVendors.png'
import totalUser from '../../assets/totalUser.png'
import monthlyRevenue from '../../assets/monthlyRevenue.png'
import { NavLink } from 'react-router-dom';

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
                <h1 className="logo">Varse</h1>
                <nav>
                    <ul>
                        <li className="active">
                            <NavLink to="/dashboard" end>Dashboard</NavLink>
                        </li>
                        <li>
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
                <div className="stats">
                    <Stat title="Total User" value="40,689" change="+8.5% Up from yesterday" icon={totalUser} />
                    <Stat title="Active User" value="10,293" change="+1.3% Up from past week" icon={activeUser} />
                    <Stat title="Active Vendors" value="$89,000" change="-4.3% Down from yesterday" danger icon={activeVendor} />
                    <Stat title="Monthly Revenue" value="2,040" change="+1.8% Up from yesterday" icon={monthlyRevenue} />
                </div>

                <div className="content">
                    {/* Add charts, tables, or other dashboard content here */}
                </div>
            </main>
        </div>
    );
}


export default Dashboard;