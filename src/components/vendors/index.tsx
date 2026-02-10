import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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

type VendorStatus = 'all' | 'active' | 'inactive' | 'blocked';

interface VendorRow {
    id: string;
    full_name: string;
    phone_number: string;
    address: string;
    email: string;
    role: string;            // admin | vendor | rider
    status: VendorStatus;
    updated_at: string;
}

const Vendor = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<VendorStatus>('all');
    const [vendors, setVendors] = useState<VendorRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
const [deleting, setDeleting] = useState(false);

    const requestDeletevendor = (vendorId: string) => {
        setSelectedVendorId(vendorId);
        setShowDeleteModal(true);
    };

    const confirmDeletevendor = async () => {
        if (!selectedVendorId) return;

        setDeleting(true);

        const { error } = await supabase
            .from('profiles')
            .update({ status: 'blocked' })
            .eq('id', selectedVendorId);

        if (!error) {
            setVendors(prev =>
                prev.map(v =>
                    v.id === selectedVendorId ? { ...v, status: 'blocked' } : v
                )
            );
        }

        setDeleting(false);
        setShowDeleteModal(false);
        setSelectedVendorId(null);
    };

    /* ---------------- LOGOUT ---------------- */
    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/', { replace: true });
    };

    /* ---------------- FETCH VENDORS ---------------- */
    const fetchVendors = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'vendor')
        // .order('created_at', { ascending: false });

        if (!error && data) {
            setVendors(data);
        }
    };

    /* ---------------- DELETE VENDOR ---------------- */
    const deleteVendor = async (vendorId: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this vendor?');
        if (!confirmed) return;

        const { error } = await supabase
            .from('profiles')
            .update({ status: 'blocked' })
            .eq('id', vendorId);

        if (!error) {
            setVendors(prev =>
                prev.map(v =>
                    v.id === vendorId ? { ...v, status: 'blocked' } : v
                )
            );
        }
    };

    /* ---------------- INITIAL LOAD ---------------- */
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchVendors()]);
            setLoading(false);
        };
        init();
    }, []);

    /* ---------------- FILTER ---------------- */
    const filteredVendors =
        activeTab === 'all'
            ? vendors
            : vendors.filter(v => v.status === activeTab);

    return (
        <div className="app">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">
                    <img src={logo} className="logo-icon" />
                    <h1>Varse</h1>
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
                        <li className="active">
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
                            <input placeholder="Search orders, customers, or rider" />
                        </div>

                        <div className="header__admin">
                            <div className="header__profile">👤</div>
                            <div className="header__admin-info">
                                <h3>{'Admin User'}</h3>
                                <p>{'Super Admin'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <h2>Vendors Management</h2>

                <div className="vendor-tabs">
                    <ul>
                        {[
                            { label: 'All Vendors', value: 'all' },
                            { label: 'Active', value: 'active' },
                            { label: 'In-Active', value: 'inactive' },
                            { label: 'Blocked', value: 'blocked' },
                        ].map(tab => (
                            <li
                                key={tab.value}
                                className={activeTab === tab.value ? 'active' : ''}
                                onClick={() => setActiveTab(tab.value as VendorStatus)}
                            >
                                {tab.label}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Vendor ID</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Date-Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center' }}>
                                        Loading vendors...
                                    </td>
                                </tr>
                            )}

                            {!loading && filteredVendors.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', color: '#9ca3af' }}>
                                        No vendors found
                                    </td>
                                </tr>
                            )}

                            {filteredVendors.map(vendor => (
                                <tr key={vendor.id}>
                                    <td>{vendor.full_name}</td>
                                    <td>{vendor.id}</td>
                                    <td>{vendor.phone_number}</td>
                                    <td>{vendor.address}</td>
                                    <td>{vendor.email}</td>
                                    <td>{new Date(vendor.updated_at).toLocaleString()}</td>

                                    {/* LOGIC ONLY – hook this to any button later */}
                                    <button onClick={() => requestDeletevendor(vendor.id)}>
                                        Delete
                                    </button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showDeleteModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>Confirm Deletion</h3>
                            <p>
                                Are you sure you want to delete this vendor’s account?
                                <br />
                                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                                    This action will block the account and prevent further access.
                                </span>
                            </p>

                            <div className="modal-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn-danger"
                                    onClick={confirmDeletevendor}
                                    disabled={deleting}
                                >
                                    {deleting ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Vendor;
