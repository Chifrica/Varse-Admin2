import { useState } from "react";
import OrderManagementHeader from "../headers/order-management";
import './styles.css';
import {
    faDownload,
    faPlus,
    faChevronDown,
    faCalendarDays,
    faFilter,
    faUserPlus,
    faXmark,
    faDollarSign,
    faCheckCircle,
    faBicycle,
    faHome,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderManagement = () => {
    const orders = [
        { id: "VR-9021" },
        { id: "VR-9022" },
        { id: "VR-9023" },
    ];

    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const toggleOrder = (id: string) => {
        setSelectedOrders((prev) =>
            prev.includes(id)
                ? prev.filter((orderId) => orderId !== id)
                : [...prev, id]
        );
    };

    const toggleAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map((o) => o.id));
        }
    };


    return (
        <>
            <OrderManagementHeader />

            <main className="order-management">
                {/* PAGE HEADER */}
                <section className="page-header">
                    <div className="page-header__left">
                        <h1>Order Management</h1>
                        <p>Real-time oversight of multi-service logistics & fulfilment</p>
                    </div>

                    <div className="page-header__actions">
                        <button className="btn btn--secondary">
                            {/* download icon */}
                            <FontAwesomeIcon icon={faDownload} />
                            Export CSV
                        </button>

                        <button className="btn btn--primary">
                            {/* plus icon */}
                            <FontAwesomeIcon icon={faPlus} />
                            Manual Order
                        </button>
                    </div>
                </section>

                {/* FILTERS */}
                <section className="filters">
                    <span className="filters__label">Filters:</span>

                    <button className="filter-btn">
                        Order Type: <strong>All</strong>
                        {/* dropdown icon */}
                        <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8 }} />
                    </button>

                    <button className="filter-btn">
                        Status: <strong>Active</strong>
                        {/* dropdown icon */}
                        <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8 }} />
                    </button>

                    <button className="filter-btn">
                        Date: <strong>Last 24 Hours</strong>
                        {/* calendar icon */}
                        <FontAwesomeIcon icon={faCalendarDays} style={{ marginLeft: 8 }} />
                    </button>

                    <div className="header__divider" />

                    <button className="filter-btn filter-btn--advanced">
                        {/* filter icon */}
                        <FontAwesomeIcon icon={faFilter} style={{ marginLeft: 8 }} />
                        Advanced Filters
                    </button>
                </section>

                {/* MAIN CONTENT */}
                <section className="content">
                    {/* LEFT COLUMN */}
                    <div className="content__left">
                        {/* BULK ACTION BAR */}
                        <div className="bulk-actions">
                            <div className="bulk-actions__left">
                                <span className="badge">
                                    {selectedOrders.length}
                                </span>
                                <span>Orders selected</span>

                                <div className="divider-vertical" />
                                <button className="link-btn">
                                    <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 8 }} />
                                    Assign Rider
                                </button>

                                <button className="link-btn link-btn--danger">
                                    <FontAwesomeIcon icon={faXmark} style={{ marginRight: 8 }} />
                                    Cancel
                                </button>

                                <button className="link-btn">
                                    <FontAwesomeIcon icon={faDollarSign} style={{ marginRight: 8 }} />
                                    Refund
                                </button>
                            </div>

                            <button className="btn btn--primary">
                                {/* verified icon */}
                                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 8 }} />
                                Apply Bulk Actions
                            </button>
                        </div>

                        {/* ORDERS TABLE */}
                        <div className="table-wrapper">
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>
                                            {/* checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.length === orders.length && orders.length > 0}
                                                onChange={toggleAll}
                                            />
                                        </th>
                                        <th>Order ID</th>
                                        <th>Buyer Name</th>
                                        <th>Vendor</th>
                                        <th>Rider</th>
                                        <th>Order Type</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            {/* checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes("VR-9021")}
                                                onChange={() => toggleOrder("VR-9021")}
                                            />
                                        </td>
                                        <td>#VR-9021</td>
                                        <td>Alex Johnson</td>
                                        <td>Burger King</td>
                                        <td>Samuel Eket</td>
                                        <td>Store</td>
                                        <td>
                                            <span className="status status--pending">Pending</span>
                                        </td>
                                        <td className="text-danger">Unpaid</td>
                                        <td>$45.00</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {/* checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes("VR-9022")}
                                                onChange={() => toggleOrder("VR-9022")}
                                            />
                                        </td>
                                        <td>#VR-9021</td>
                                        <td>Alex Johnson</td>
                                        <td>Burger King</td>
                                        <td>Samuel Eket</td>
                                        <td>Store</td>
                                        <td>
                                            <span className="status status--pending">Pending</span>
                                        </td>
                                        <td className="text-danger">Unpaid</td>
                                        <td>$45.00</td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {/* checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes("VR-9023")}
                                                onChange={() => toggleOrder("VR-9023")}
                                            />
                                        </td>
                                        <td>#VR-9021</td>
                                        <td>Alex Johnson</td>
                                        <td>Burger King</td>
                                        <td>Samuel Eket</td>
                                        <td>Store</td>
                                        <td>
                                            <span className="status status--pending">Pending</span>
                                        </td>
                                        <td className="text-danger">Unpaid</td>
                                        <td>$45.00</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* TABLE FOOTER */}
                            <div className="table-footer">
                                <p>Showing 1–3 of 12 orders</p>
                                <div className="pagination-controls">
                                    <button className="pagination-btn">Previous</button>
                                    <button className="pagination-btn active">1</button>
                                    <button className="pagination-btn">2</button>
                                    <button className="pagination-btn">3</button>
                                    <button className="pagination-btn">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <aside className="content__right">
                        <header className="lifecycle-header">
                            <h2>Order Lifecycle</h2>
                            <p>#VR-9021 – Alex Johnson</p>
                        </header>

                        <div className="lifecycle">
                            <div className="lifecycle-item completed">
                                {/* check icon */}
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <div>
                                    <h4>Order Placed</h4>
                                    <p>Customer successfully checked out through the app.</p>
                                </div>
                                <span className="time">10:02 AM</span>
                            </div>

                            <div className="lifecycle-item completed">
                                {/* check icon */}
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <div>
                                    <h4>Prepared by Vendor</h4>
                                    <p>Burger King confirmed the order and marked it ready.</p>
                                </div>
                                <span className="time">10:15 AM</span>
                            </div>

                            <div className="lifecycle-item active">
                                {/* bike icon */}
                                <FontAwesomeIcon icon={faBicycle} />
                                <div>
                                    <h4>Picked up by Rider</h4>
                                    <p>Sam Rite has collected the package and is in transit.</p>

                                    <div className="rider-card">
                                        {/* avatar */}
                                        <FontAwesomeIcon icon={faUserPlus} />
                                        <div>
                                            <strong>Sam Rite</strong>
                                            <span>4.8 · Honda Civic (ABC-123)</span>
                                        </div>
                                        {/* call icon */}
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                </div>
                                <span className="time">10:28 AM</span>
                            </div>

                            <div className="lifecycle-item">
                                {/* home icon */}
                                <FontAwesomeIcon icon={faHome} />
                                <div>
                                    <h4>Delivered</h4>
                                    <p>Waiting for arrival at Alex Johnson's location.</p>
                                </div>
                                <span className="time pending">Pending</span>
                            </div>
                        </div>

                        <button className="btn btn--primary btn--full">
                            Assign New Rider
                        </button>
                    </aside>
                </section>
            </main>
        </>
    );
};

export default OrderManagement;
