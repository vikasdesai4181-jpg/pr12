import { useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from 'react-router-dom'
import orderMark from './assets/orderly-mark.png'
import './App.css'

const orders = {
  current: [
    {
      id: 'ORD-2841',
      customer: 'Olivia Rhye',
      initials: 'OR',
      color: 'lilac',
      product: 'Everyday Backpack',
      details: 'Midnight black · Qty 1',
      date: 'Oct 24, 2026',
      amount: 128,
      status: 'In transit',
      statusType: 'transit',
      delivery: 'Arriving Oct 27',
    },
    {
      id: 'ORD-2839',
      customer: 'Phoenix Baker',
      initials: 'PB',
      color: 'peach',
      product: 'Ceramic Pour-over Set',
      details: 'Sandstone · Qty 1',
      date: 'Oct 23, 2026',
      amount: 74,
      status: 'Processing',
      statusType: 'processing',
      delivery: 'Ships Oct 26',
    },
    {
      id: 'ORD-2836',
      customer: 'Lana Steiner',
      initials: 'LS',
      color: 'blue',
      product: 'Linen Table Throw',
      details: 'Natural · Qty 2',
      date: 'Oct 22, 2026',
      amount: 96,
      status: 'In transit',
      statusType: 'transit',
      delivery: 'Arriving Oct 26',
    },
    {
      id: 'ORD-2832',
      customer: 'Demi Wilkinson',
      initials: 'DW',
      color: 'green',
      product: 'Sculpted Glass Vase',
      details: 'Smoke · Qty 1',
      date: 'Oct 21, 2026',
      amount: 58,
      status: 'Processing',
      statusType: 'processing',
      delivery: 'Ships Oct 25',
    },
  ],
  history: [
    {
      id: 'ORD-2818',
      customer: 'Candice Wu',
      initials: 'CW',
      color: 'peach',
      product: 'Woven Market Tote',
      details: 'Natural · Qty 1',
      date: 'Oct 18, 2026',
      amount: 42,
      status: 'Delivered',
      statusType: 'delivered',
      delivery: 'Delivered Oct 21',
    },
    {
      id: 'ORD-2804',
      customer: 'Natali Craig',
      initials: 'NC',
      color: 'blue',
      product: 'Everyday Backpack',
      details: 'Olive · Qty 1',
      date: 'Oct 14, 2026',
      amount: 128,
      status: 'Delivered',
      statusType: 'delivered',
      delivery: 'Delivered Oct 18',
    },
    {
      id: 'ORD-2791',
      customer: 'Drew Cano',
      initials: 'DC',
      color: 'lilac',
      product: 'Linen Table Throw',
      details: 'Natural · Qty 1',
      date: 'Oct 09, 2026',
      amount: 48,
      status: 'Delivered',
      statusType: 'delivered',
      delivery: 'Delivered Oct 12',
    },
  ],
  cancelled: [
    {
      id: 'ORD-2827',
      customer: 'Orlando Diggs',
      initials: 'OD',
      color: 'green',
      product: 'Ceramic Pour-over Set',
      details: 'Sandstone · Qty 1',
      date: 'Oct 20, 2026',
      amount: 74,
      status: 'Cancelled',
      statusType: 'cancelled',
      delivery: 'Refund issued Oct 21',
    },
    {
      id: 'ORD-2786',
      customer: 'Andi Lane',
      initials: 'AL',
      color: 'peach',
      product: 'Sculpted Glass Vase',
      details: 'Smoke · Qty 2',
      date: 'Oct 07, 2026',
      amount: 116,
      status: 'Cancelled',
      statusType: 'cancelled',
      delivery: 'Refund issued Oct 08',
    },
  ],
}

const orderTabs = [
  { label: 'Current orders', path: 'current', key: 'current' },
  { label: 'Order history', path: 'history', key: 'history' },
  { label: 'Cancelled', path: 'cancelled', key: 'cancelled' },
]

const orderPages = {
  current: {
    title: 'Current orders',
    description: 'Keep an eye on everything that’s on its way.',
    data: orders.current,
  },
  history: {
    title: 'Order history',
    description: 'A little look back at all the good things you’ve ordered.',
    data: orders.history,
  },
  cancelled: {
    title: 'Cancelled orders',
    description: 'Orders you decided not to go ahead with.',
    data: orders.cancelled,
  },
}

function formatAmount(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <Link className="brand" to="/orders/current">
        <span className="brand-image">
          <img src={orderMark} alt="" />
        </span>
        <span className="brand-name">goodthings<span>.</span></span>
      </Link>

      <div className="store-label">YOUR ACCOUNT</div>
      <nav className="side-nav" aria-label="Account navigation">
        <div className="side-link">
          <span className="nav-icon" aria-hidden="true">⌂</span>
          Overview
        </div>
        <NavLink to="/orders/current" className="side-link selected">
          <span className="nav-icon order-icon" aria-hidden="true">▤</span>
          Orders
          <span className="nav-count">4</span>
        </NavLink>
        <a className="side-link" href="mailto:help@goodthings.example">
          <span className="nav-icon" aria-hidden="true">♡</span>
          Support
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-spark" aria-hidden="true">✳</span>
          <p>Need a hand?</p>
          <span>We’re just a message away.</span>
          <a href="mailto:help@goodthings.example">Get in touch <span aria-hidden="true">↗</span></a>
        </div>
        <div className="profile">
          <div className="profile-avatar">JD</div>
          <div>
            <strong>Jamie Dawson</strong>
            <span>jamie@email.com</span>
          </div>
          <span className="profile-menu" aria-hidden="true">···</span>
        </div>
      </div>
    </aside>
  )
}

function OrdersLayout() {
  const [search, setSearch] = useState('')

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Account</span>
            <span aria-hidden="true">/</span>
            <strong>Orders</strong>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                aria-label="Search orders"
                placeholder="Search anything..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              ♧<span />
            </button>
            <div className="top-avatar" aria-label="Jamie Dawson">JD</div>
          </div>
        </header>

        <div className="content-area">
          <div className="page-heading">
            <div>
              <p className="eyebrow">YOUR ACCOUNT <span>·</span> ORDERS</p>
              <h1>Orders</h1>
              <p className="page-subtitle">All the little things, all in one place.</p>
            </div>
            <div className="heading-decoration" aria-hidden="true">
              <span>✳</span>
              <span>✳</span>
              <span>✳</span>
            </div>
          </div>

          <section className="summary-grid" aria-label="Order summary">
            <SummaryCard label="Current orders" value="04" icon="↗" tone="purple" detail="On their way to you" />
            <SummaryCard label="Delivered this month" value="08" icon="✓" tone="green" detail="All arrived safely" />
            <SummaryCard label="Total spent" value="$1,284" icon="$" tone="peach" detail="Across 12 orders" />
          </section>

          <section className="orders-panel">
            <div className="panel-heading">
              <div>
                <h2>Order overview</h2>
                <p>Track, revisit, and manage your purchases.</p>
              </div>
              <button className="filter-button" type="button" onClick={() => setSearch('')}>
                <span aria-hidden="true">↻</span> Clear search
              </button>
            </div>
            <nav className="order-tabs" aria-label="Order categories">
              {orderTabs.map(({ label, path, key }) => (
                <NavLink
                  key={key}
                  to={path}
                  className={({ isActive }) => `order-tab${isActive ? ' active' : ''}`}
                >
                  {label}
                  <span className="tab-count">{orders[key].length.toString().padStart(2, '0')}</span>
                </NavLink>
              ))}
            </nav>
            <Outlet context={search} />
          </section>
          <footer className="page-footer">
            <span>© 2026 goodthings</span>
            <span>Made for the things that make your day.</span>
          </footer>
        </div>
      </main>
    </div>
  )
}

function SummaryCard({ label, value, icon, tone, detail }) {
  return (
    <article className="summary-card">
      <div className={`summary-icon ${tone}`} aria-hidden="true">{icon}</div>
      <p>{label}</p>
      <div className="summary-bottom">
        <strong>{value}</strong>
        <span>{detail}</span>
      </div>
    </article>
  )
}

function OrderList({ type }) {
  const search = useOutletContext()
  const { title, data } = orderPages[type]
  const query = search.trim().toLowerCase()
  const filteredOrders = data.filter((order) =>
    [order.id, order.customer, order.product, order.status].some((value) =>
      value.toLowerCase().includes(query),
    ),
  )

  return (
    <div className="table-wrap">
      <div className="table-label">
        <span>{title}</span>
        <span>{filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">ORDER</th>
            <th scope="col">PRODUCT</th>
            <th scope="col">DATE</th>
            <th scope="col">STATUS</th>
            <th scope="col">TOTAL</th>
            <th scope="col"><span className="visually-hidden">Order details</span></th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>
                <div className="customer-cell">
                  <div className={`customer-avatar ${order.color}`}>{order.initials}</div>
                  <div><strong>{order.customer}</strong><span>{order.id}</span></div>
                </div>
              </td>
              <td><div className="product-cell"><strong>{order.product}</strong><span>{order.details}</span></div></td>
              <td className="date-cell">{order.date}</td>
              <td>
                <div className="status-cell">
                  <span className={`status-pill ${order.statusType}`}><i />{order.status}</span>
                  <span>{order.delivery}</span>
                </div>
              </td>
              <td className="amount-cell">{formatAmount(order.amount)}</td>
              <td className="more-cell"><button type="button" aria-label={`More options for ${order.id}`}>···</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredOrders.length === 0 && (
        <div className="empty-state">
          <span aria-hidden="true">⌕</span>
          <strong>No orders found</strong>
          <p>Try another search term or clear your search.</p>
        </div>
      )}
      <div className="table-footer">
        <span>Showing <strong>{filteredOrders.length}</strong> of <strong>{data.length}</strong> orders</span>
        <div className="pagination">
          <button type="button" disabled aria-label="Previous page">←</button>
          <span>1</span>
          <button type="button" disabled aria-label="Next page">→</button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders/current" replace />} />
      <Route path="/orders" element={<OrdersLayout />}>
        <Route index element={<Navigate to="current" replace />} />
        <Route path="current" element={<OrderList type="current" />} />
        <Route path="history" element={<OrderList type="history" />} />
        <Route path="cancelled" element={<OrderList type="cancelled" />} />
      </Route>
      <Route path="*" element={<Navigate to="/orders/current" replace />} />
    </Routes>
  )
}

export default App
