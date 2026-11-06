
import { useState } from 'react'
import {
  LayoutDashboard, ShoppingCart, Users, Package,
  Settings, Search, Bell, Menu, X, TrendingUp,
  TrendingDown, DollarSign, Download, CalendarDays,
  MoreHorizontal, ArrowUpRight
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis,
  YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 4200, orders: 2400 },
  { month: 'Feb', revenue: 5200, orders: 3200 },
  { month: 'Mar', revenue: 4600, orders: 2800 },
  { month: 'Apr', revenue: 6500, orders: 4100 },
  { month: 'May', revenue: 5800, orders: 3600 },
  { month: 'Jun', revenue: 7800, orders: 4900 },
  { month: 'Jul', revenue: 7100, orders: 4500 },
  { month: 'Aug', revenue: 9200, orders: 5800 },
  { month: 'Sep', revenue: 8400, orders: 5200 },
  { month: 'Oct', revenue: 10500, orders: 6800 },
  { month: 'Nov', revenue: 9600, orders: 6100 },
  { month: 'Dec', revenue: 12000, orders: 7800 },
]

const trafficData = [
  { name: 'Direct', value: 35, color: '#6366f1' },
  { name: 'Social', value: 25, color: '#22c55e' },
  { name: 'Referral', value: 20, color: '#f59e0b' },
  { name: 'Organic', value: 20, color: '#06b6d4' },
]

const initialOrders = [
  { id: '#ORD-1001', customer: 'Sandeep', email: 'Sandeep@example.com', product: 'Wireless Headphones', date: 'Oct 24, 2026', amount: 129, status: 'Completed' },
  { id: '#ORD-1002', customer: 'Mohit', email: 'Mohit@example.com', product: 'Smart Watch', date: 'Oct 24, 2026', amount: 249, status: 'Processing' },
  { id: '#ORD-1003', customer: 'Kartik', email: 'Kartik@example.com', product: 'Laptop Stand', date: 'Oct 23, 2026', amount: 79, status: 'Completed' },
  { id: '#ORD-1004', customer: 'sujal', email: 'sujal@example.com', product: 'Mechanical Keyboard', date: 'Oct 22, 2026', amount: 159, status: 'Pending' },
  { id: '#ORD-1005', customer: 'Himanshu', email: 'Himanshu@example.com', product: 'USB-C Hub', date: 'Oct 21, 2026', amount: 59, status: 'Completed' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Products', icon: Package },
  { label: 'Customers', icon: Users },
  { label: 'Settings', icon: Settings },
]

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`${open ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0`}>
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">A</div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Auspify</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Workspace</p>
          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon }) => (
              <button key={label} onClick={() => { setActive(label); setOpen(false) }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active === label ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                <Icon size={19} /> {label}
                {label === 'Orders' && <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">5</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <p className="font-semibold">Need help?</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Check the dashboard guide to get started.</p>
            <button className="mt-4 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100">View Guide</button>
          </div>
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">AS</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">Admin User</p>
              <p className="truncate text-xs text-slate-500">admin@Auspify.com</p>
            </div>
            <MoreHorizontal size={20} className="text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  )
}

function StatCard({ title, value, change, positive, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon size={20} /></span>
      </div>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{value}</h3>
      <div className="mt-2 flex items-center gap-1 text-xs">
        {positive ? <TrendingUp size={14} className="text-emerald-600" /> : <TrendingDown size={14} className="text-rose-600" />}
        <span className={positive ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>{change}</span>
        <span className="text-slate-400">vs. last month</span>
      </div>
    </div>
  )
}

function RevenueChart({ period }) {
  const data = period === '7 days' ? revenueData.slice(-7) : period === '30 days' ? revenueData.slice(-1) : revenueData
  const chartData = period === '30 days'
    ? revenueData.slice(-6)
    : data

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }} />
          <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fill="url(#revenueGradient)" activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function TrafficChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={trafficData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={83} paddingAngle={4} stroke="none">
              {trafficData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Traffic']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        {trafficData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500">{item.name}</span>
            <span className="ml-auto font-semibold text-slate-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrdersTable({ orders, search, setSearch, status, setStatus }) {
  const filtered = orders.filter((order) => {
    const matchesSearch = `${order.id} ${order.customer} ${order.product}`.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = status === 'All' || order.status === status
    return matchesSearch && matchesStatus
  })

  const exportCSV = () => {
    const header = ['Order ID', 'Customer', 'Email', 'Product', 'Date', 'Amount', 'Status']
    const rows = filtered.map((o) => [o.id, o.customer, o.email, o.product, o.date, o.amount, o.status])
    const csv = [header, ...rows].map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Auspify-orders.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-slate-900">Recent Orders</h2>
          <p className="mt-1 text-sm text-slate-500">Manage and track your latest orders</p>
        </div>
        <button onClick={exportCSV} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"><Download size={16} /> Export CSV</button>
      </div>

      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row">
        <div className="relative flex-1">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders or customers..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400">
          <option>All</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold">Customer</th>
              <th className="px-5 py-3 font-semibold">Product</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((order) => (
              <tr key={order.id} className="transition hover:bg-slate-50/70">
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-indigo-600">{order.id}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <p className="font-semibold text-slate-800">{order.customer}</p>
                  <p className="mt-1 text-xs text-slate-400">{order.email}</p>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-600">{order.product}</td>
                <td className="whitespace-nowrap px-5 py-4 text-slate-500">{order.date}</td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800">${order.amount.toFixed(2)}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : order.status === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{order.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" className="px-5 py-10 text-center text-slate-500">No matching orders found.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">Showing {filtered.length} of {orders.length} orders</div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('Overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [period, setPeriod] = useState('12 months')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [orders] = useState(initialOrders)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu size={21} /></button>
            <div>
              <p className="text-xs font-medium text-slate-400">Workspace / {active}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">{active === 'Overview' ? 'Dashboard Overview' : active}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" onClick={() => alert('You are all caught up!')} className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"><Bell size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" /></button>
            <div className="hidden h-9 w-px bg-slate-200 sm:block" />
            <div className="hidden text-right sm:block"><p className="text-sm font-semibold">Admin User</p><p className="text-xs text-slate-500">Administrator</p></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">AS</div>
          </div>
        </header>

        <div className="mx-auto max-w-screen-2xl space-y-7 p-4 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back, Admin 👋</h1>
              <p className="mt-1 text-sm text-slate-500">Here's what's happening with your store today.</p>
            </div>
            <button onClick={() => alert('Demo dashboard data refreshed!')} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"><CalendarDays size={17} /> October 2026 <ArrowUpRight size={16} /></button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard title="Total Revenue" value="$48,294" change="+12.8%" positive icon={DollarSign} color="bg-indigo-50 text-indigo-600" />
            <StatCard title="Total Orders" value="2,845" change="+8.2%" positive icon={ShoppingCart} color="bg-emerald-50 text-emerald-600" />
            <StatCard title="Total Customers" value="1,893" change="+5.4%" positive icon={Users} color="bg-amber-50 text-amber-600" />
            <StatCard title="Conversion Rate" value="3.64%" change="-1.2%" positive={false} icon={TrendingUp} color="bg-rose-50 text-rose-600" />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 xl:col-span-2">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div><h2 className="font-bold text-slate-900">Revenue Analytics</h2><p className="mt-1 text-sm text-slate-500">Track your revenue performance over time</p></div>
                <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-400">
                  <option>12 months</option>
                  <option>30 days</option>
                  <option>7 days</option>
                </select>
              </div>
              <RevenueChart period={period} />
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div><h2 className="font-bold text-slate-900">Traffic Sources</h2><p className="mt-1 text-sm text-slate-500">Where your visitors come from</p></div>
              <TrafficChart />
            </section>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <OrdersTable orders={orders} search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
            </div>
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold text-slate-900">Quick Insights</h2>
              <p className="mt-1 text-sm text-slate-500">Your store at a glance</p>
              <div className="mt-5 space-y-5">
                <div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-500">Monthly target</span><span className="font-semibold">78%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[78%] rounded-full bg-indigo-500" /></div></div>
                <div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-500">Customer retention</span><span className="font-semibold">64%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[64%] rounded-full bg-emerald-500" /></div></div>
                <div><div className="mb-2 flex justify-between text-sm"><span className="text-slate-500">Cart completion</span><span className="font-semibold">86%</span></div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 w-[86%] rounded-full bg-amber-500" /></div></div>
              </div>
              <div className="mt-7 rounded-xl bg-indigo-50 p-4"><p className="text-sm font-semibold text-indigo-900">Great progress!</p><p className="mt-1 text-xs leading-5 text-indigo-700">Your revenue is growing. Keep monitoring orders and customer activity to reach your monthly goal.</p></div>
            </section>
          </div>

          <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">© 2026 Auspify Dashboard · Built with React, Tailwind CSS and Recharts</footer>
        </div>
      </main>
    </div>
  )
}
