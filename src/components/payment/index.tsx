import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import pendingWallet from '../../assets/pendingWallet.png'
import appRevenue from '../../assets/appRevenue.png'
import riderWallet from '../../assets/riderWallet.png'
import vendorEarning from '../../assets/vendorsEarning.png'
import { NavLink, useNavigate } from "react-router-dom";

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
import { supabase } from "../../supabaseClient";

// --- INTERFACES ---
interface StatProps {
    title: string;
    value: string;
    change: string;
    danger?: boolean;
    icon?: string;
}

interface PaymentRow {
    id: number;
    user_type: 'Buyer' | 'Vendor';
    amount: number;
    method: string;
    status: 'Completed' | 'Pending';
    created_at: string;
}

interface WithdrawalRequest {
    id: number;
    created_at: string;
    account_name: string;
    account_number: string; // Changed to string for better handling
    bank_name: string;
    bank_code: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    vendor_id: string;
}

// --- SUB-COMPONENTS ---
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

function Payment({ name, amount, time, onApprove }: { name: string; amount: number; time: string; onApprove: () => void; }) {
    return (
        <div className="payment">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: '100%' }}>
                <div>
                    <p style={{ fontSize: "14px", fontWeight: 'bold' }}>{name}</p>
                    <p className="txt">Vendor • {time}</p>
                </div>
                <span className="amount">₦{amount.toLocaleString()}</span>
            </div>
            <div className="payment-actions">
                <button className="primary" onClick={onApprove}>Approve</button>
                <button className="ghost">Reject</button>
            </div>
        </div>
    );
}

type TabType = "All Transactions" | "Riders" | "Customers" | "Vendors";

const PaymentPage = () => {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState<TabType>("All Transactions");
    const [payments, setPayments] = useState<PaymentRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
    const [totalWithdrawalCount, setTotalWithdrawalCount] = useState(0);
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [stats, setStats] = useState({
        appRevenue: 0,
        riderWallet: 0,
        vendorEarnings: 0,
        pendingWithdrawalsCount: 0,
    });

    // --- LOGIC: FETCH DATA ---
    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Orders (Transactions)
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (orderError) throw orderError;

            const mappedPayments: PaymentRow[] = (orderData ?? []).map(order => ({
                id: order.id,
                user_type: order.buyer_id ? 'Buyer' : 'Vendor',
                amount: order.total_price,
                method: order.paid ? 'Transfer' : 'Pending',
                status: order.paid ? 'Completed' : 'Pending',
                created_at: order.created_at,
            }));
            setPayments(mappedPayments);

            // 2. Fetch Withdrawal Requests (Pending Only for Sidebar)
            const { data: withdrawData, count, error: withdrawError } = await supabase
                .from('withdrawal_requests')
                .select('*', { count: 'exact' })
                .eq('status', 'pending')
                .order('created_at', { ascending: false });

            if (withdrawError) throw withdrawError;
            setWithdrawals(withdrawData?.slice(0, 2) || []); // Only show top 2 in sidebar
            setTotalWithdrawalCount(count || 0);

            // 3. Calculate Stats
            const completed = mappedPayments.filter(p => p.status === 'Completed');
            setStats({
                appRevenue: completed.reduce((s, p) => s + p.amount, 0),
                riderWallet: 0, // Placeholder
                vendorEarnings: completed.reduce((s, p) => s + p.amount, 0),
                pendingWithdrawalsCount: count || 0,
            });

        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // LOGIC: Real-time update for withdrawal requests
        const withdrawSubscription = supabase
            .channel('withdrawal_updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'withdrawal_requests' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(withdrawSubscription);
        };
    }, []);

    // --- LOGIC: HANDLERS ---
    const handleConfirmApproval = async () => {
        if (!selectedWithdrawal) return;

        const { error } = await supabase
            .from('withdrawal_requests')
            .update({ status: 'approved' })
            .eq('id', selectedWithdrawal.id);

        if (!error) {
            // Update UI locally
            setWithdrawals(prev => prev.filter(w => w.id !== selectedWithdrawal.id));
            setTotalWithdrawalCount(prev => prev - 1);
            setShowModal(false);
            setSelectedWithdrawal(null);
        } else {
            alert("Error approving withdrawal: " + error.message);
        }
    };

    const filteredPaymentsList = payments.filter(p => {
        if (activeTab === "Customers") return p.user_type === "Buyer";
        if (activeTab === "Vendors") return p.user_type === "Vendor";
        if (activeTab === "Riders") return false; // Placeholder
        return true;
    }).filter(p => p.id.toString().includes(searchTerm));

    const tabs: TabType[] = ["All Transactions", "Riders", "Customers", "Vendors"];

    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/', { replace: true });
    };

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} className="logo-icon" alt="logo" />
                    <h1>Varse</h1>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/dashboard" end><img src={dashboardIcon} className="nav-icon" /> Dashboard</NavLink></li>
                        <li><NavLink to="/orders"><img src={dashboardIcon} className="nav-icon" /> Order History</NavLink></li>
                        <li><NavLink to="/riders"><img src={ridersIcon} className="nav-icon" /> Riders</NavLink></li>
                        <li><NavLink to="/vendors"><img src={vendorsIcon} className="nav-icon" /> Vendors</NavLink></li>
                        <li><NavLink to="/customers"><img src={customersIcon} className="nav-icon" /> Customers</NavLink></li>
                        <li><NavLink to="/support"><img src={supportIcon} className="nav-icon" /> Support</NavLink></li>
                        <li className="active"><NavLink to="/payment"><img src={paymentIcon} className="nav-icon" /> Payment</NavLink></li>
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
                                    <NavLink to="/" onClick={handleLogout}>
                                        <img src={logout} className="nav-icon" /> Logout
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </aside>

            <main className="main">
                <div className="topbar">
                    <div className="topbar-actions">
                        <div className="header__search">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input 
                                type="text" 
                                placeholder="Search by Transaction ID..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                    <Stat title="App Revenue" value={`₦${stats.appRevenue.toLocaleString()}`} change="+8.5% Up from yesterday" icon={appRevenue} />
                    <Stat title="Rider Wallet Balc." value={`₦${stats.riderWallet.toLocaleString()}`} change="+1.3% Up from past week" icon={riderWallet} />
                    <Stat title="Vendor Earnings" value={`₦${stats.vendorEarnings.toLocaleString()}`} change="-4.3% Down from yesterday" danger icon={vendorEarning} />
                    <Stat title="Pending Withdrawals" value={stats.pendingWithdrawalsCount.toString()} change="+1.8% Up from yesterday" icon={pendingWallet} />
                </div>

                <div className="content">
                    <section className="card">
                        <div className="payments-header-tabs">
                            {tabs.map((tab) => (
                                <p key={tab} className={activeTab === tab ? "tab active" : "tab"} onClick={() => setActiveTab(tab)}>
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
                                {loading ? (
                                    <tr><td colSpan={5}>Loading transactions...</td></tr>
                                ) : filteredPaymentsList.map((row) => (
                                    <tr key={row.id}>
                                        <td>#{row.id}</td>
                                        <td>{row.user_type}</td>
                                        <td>₦{row.amount.toLocaleString()}</td>
                                        <td>{row.method}</td>
                                        <td>
                                            <span className={`status-pill ${row.status === "Completed" ? "success" : "pending"}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <div className="side-panels">
                        <section className="card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={quick} alt="quick" />
                                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Quick Refund process</p>
                            </div>
                            <p style={{ color: "#6B7280", fontSize: '14px', margin: '10px 0' }}>Enter Transaction ID to initiate full transaction or reversal</p>
                            <input placeholder="E.g Tnx ..." style={{ color: "#000", padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
                            <button className="primary">Search transaction</button>
                        </section>

                        <section className="card">
                            <div className="payments-header">
                                <div className="payments-header-icon" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src={bank} alt="bank" />
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Payments Request</p>
                                </div>
                                <span className="badge">Urgent</span>
                            </div>
                            
                            {withdrawals.length > 0 ? withdrawals.map(req => (
                                <Payment
                                    key={req.id}
                                    name={req.account_name}
                                    amount={req.amount}
                                    time={new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    onApprove={() => {
                                        setSelectedWithdrawal(req);
                                        setShowModal(true);
                                    }}
                                />
                            )) : <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No pending requests</p>}

                            <a href="#" className="link">View All {totalWithdrawalCount} requests</a>
                        </section>
                    </div>
                </div>

                {showModal && selectedWithdrawal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Approve Withdrawal</h3>
                            <p className="p1">You are about to approve a withdrawal of <strong>₦{selectedWithdrawal.amount.toLocaleString()}</strong></p>
                            <div className="modal-details">
                                <p><strong>Bank:</strong><br /> </p>
                                <p><span> {selectedWithdrawal.bank_name}</span></p>
                                <p><strong>Account:</strong><br /><span> {selectedWithdrawal.account_number}</span></p>
                                <p><strong>Name:</strong><br /><span> {selectedWithdrawal.account_name}</span></p>
                            </div>
                            <div className="modal-actions">
                                <button className="ghost" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="primary" onClick={handleConfirmApproval}>Confirm Approval</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default PaymentPage;