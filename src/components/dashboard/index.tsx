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
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

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

    const [totalUsers, setTotalUsers] = useState(0);
    const [activeBuyers, setActiveBuyers] = useState(0);
    const [activeVendors, setActiveVendors] = useState(0);
    const [monthlyRevenues, setMonthlyRevenues] = useState(0);
    const [loading, setLoading] = useState(true);
    const formattedMonthlyRevenue = `₦${monthlyRevenues.toLocaleString()}`;

    const CHART_HEIGHT = 220;
    const MAX_REVENUE = 100000; // expected upper bound (adjust if needed)

    // Normalize revenue into chart Y position
    const normalizeRevenue = (value: number) => {
        const ratio = Math.min(value / MAX_REVENUE, 1);
        return CHART_HEIGHT - ratio * CHART_HEIGHT;
    };

    // Generate smooth mock points influenced by monthly revenue
    const generateRevenuePath = (revenue: number) => {
        const baseY = normalizeRevenue(revenue);

        const points = [
            { x: 0, y: baseY + 40 },
            { x: 100, y: baseY + 20 },
            { x: 200, y: baseY },
            { x: 300, y: baseY + 30 },
            { x: 400, y: baseY + 10 },
            { x: 500, y: baseY - 10 },
            { x: 600, y: baseY + 5 },
            { x: 700, y: baseY - 15 },
            { x: 800, y: baseY }
        ];

        const linePath = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`)
            .join(' ');

        const areaPath = `${linePath} L800 260 L0 260 Z`;

        return { linePath, areaPath };
    };

    const { linePath, areaPath } = generateRevenuePath(monthlyRevenues);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                /** 1️⃣ TOTAL USERS */
                const { count: totalUsersCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true });

                /** 2️⃣ ACTIVE BUYERS */
                const { count: buyersCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'buyer');

                /** 3️⃣ ACTIVE VENDORS */
                const { count: vendorsCount } = await supabase
                    .from('profiles')
                    .select('*', { count: 'exact', head: true })
                    .eq('role', 'vendor');

                /** 4️⃣ MONTHLY REVENUE */
                const startOfMonth = new Date();
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const { data: revenueData } = await supabase
                    .from('orders')
                    .select('total_price')
                    .gte('created_at', startOfMonth.toISOString());

                const revenueSum =
                    revenueData?.reduce(
                        (sum, order) => sum + (order.total_price ?? 0),
                        0
                    ) ?? 0;

                setTotalUsers(totalUsersCount ?? 0);
                setActiveBuyers(buyersCount ?? 0);
                setActiveVendors(vendorsCount ?? 0);
                setMonthlyRevenues(revenueSum);
            } catch (error) {
                console.error('Dashboard stats error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
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
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/setting">
                                        <img src={settings} className="nav-icon" /> Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout">
                                        <img src={logout} className="nav-icon" /> Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </aside >

            {/* Main */}
            < main className="main" >
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
                    <Stat title="Total User" value={loading ? '—' : totalUsers.toLocaleString()} change="+8.5% Up from yesterday" icon={totalUser} />
                    <Stat title="Active Buyers" value={loading ? '—' : activeBuyers.toLocaleString()} change="+1.3% Up from past week" icon={activeUser} />
                    <Stat title="Active Vendors" value={loading ? '—' : activeVendors.toLocaleString()} change="-4.3% Down from yesterday" danger icon={activeVendor} />
                    <Stat title="Monthly Revenue" value={loading ? '—' : `₦${monthlyRevenues.toLocaleString()}`} change="+1.8% Up from yesterday" icon={monthlyRevenue} />
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
                                        d={areaPath}
                                        fill="rgba(255, 136, 0, 0.12)"
                                    />

                                    {/* Line */}
                                    <path
                                        d={linePath}
                                        fill="none"
                                        stroke="#ff8800"
                                        strokeWidth="2"
                                    />

                                    <circle cx="200" cy="140" r="4" fill="#ff8800" />
                                </svg>
                                <div className="chart-tooltip">
                                    {loading ? '—' : formattedMonthlyRevenue}
                                </div>
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
            </main >
        </div >
    );
}

export default Dashboard;