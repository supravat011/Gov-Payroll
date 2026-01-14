import React from 'react';
import { Card, Table, Badge, Button } from './ui/UIComponents';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Building2, CreditCard, TrendingUp, Download, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

const payrollData = [
  { name: 'Jan', amount: 450000 },
  { name: 'Feb', amount: 455000 },
  { name: 'Mar', amount: 452000 },
  { name: 'Apr', amount: 460000 },
  { name: 'May', amount: 475000 },
  { name: 'Jun', amount: 480000 },
];

const deptData = [
  { name: 'Engineering', count: 120, budget: 85 },
  { name: 'Health', count: 85, budget: 65 },
  { name: 'Education', count: 200, budget: 90 },
  { name: 'Finance', count: 45, budget: 40 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 mt-1 font-medium">Welcome back, Administrator. Here's what's happening today.</p>
        </div>
        <div className="flex space-x-3">
            <Button variant="secondary" className="shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Export Report
            </Button>
            <Button variant="primary" className="shadow-glow">
                <Building2 className="w-4 h-4 mr-2" /> Add Department
            </Button>
        </div>
      </div>

      {/* Stats Grid with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Employees', value: '1,245', icon: Users, change: '+12%', trend: 'up', gradient: 'from-blue-500 to-blue-600' },
          { label: 'Total Departments', value: '12', icon: Building2, change: 'Stable', trend: 'neutral', gradient: 'from-indigo-500 to-indigo-600' },
          { label: 'Monthly Payroll', value: '$480k', icon: CreditCard, change: '+2.4%', trend: 'up', gradient: 'from-emerald-500 to-emerald-600' },
          { label: 'Pending Requests', value: '23', icon: TrendingUp, change: '-5%', trend: 'down', gradient: 'from-amber-500 to-amber-600' },
        ].map((stat, index) => (
          <div key={index} className="relative overflow-hidden bg-white rounded-2xl shadow-soft border border-slate-100 p-6 group hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 font-display">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2 font-display">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                {stat.trend === 'up' ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold flex items-center text-xs">
                        <ArrowUpRight className="w-3 h-3 mr-1" /> {stat.change}
                    </span>
                ) : stat.trend === 'down' ? (
                    <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full font-bold flex items-center text-xs">
                        <ArrowDownRight className="w-3 h-3 mr-1" /> {stat.change}
                    </span>
                ) : (
                    <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-bold flex items-center text-xs">
                        {stat.change}
                    </span>
                )}
                <span className="text-slate-400 ml-2 text-xs font-medium">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Payroll Analytics</h3>
                <p className="text-sm text-slate-500">6 Month Spending Trend</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block p-2">
                <option>Last 6 Months</option>
                <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={payrollData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Disbursed']}
                />
                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-1 p-6">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-lg font-bold text-slate-900 font-display">Department Staffing</h3>
             <button className="text-slate-400 hover:text-brand-600"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" barSize={20} margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip 
                     cursor={{ fill: 'transparent' }}
                     contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: 'none', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Employees" />
                <Bar dataKey="budget" fill="#e2e8f0" radius={[0, 4, 4, 0]} name="Budget %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Departments Table */}
      <Card noPadding className="overflow-hidden border-0 shadow-lg">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Department Performance</h3>
                <p className="text-sm text-slate-500">Real-time status updates across all wings</p>
            </div>
            <Button variant="outline" className="text-xs">View All Departments</Button>
        </div>
        <Table headers={['Department Name', 'Head of Dept', 'Employees', 'Budget Status', 'Performance', 'Actions']}>
            {[
                { name: 'Civil Engineering', head: 'Dr. A. Sharma', count: 45, status: 'On Track', performance: 92 },
                { name: 'Public Health', head: 'Dr. S. Patel', count: 32, status: 'Review', performance: 78 },
                { name: 'Urban Planning', head: 'Mr. R. Kumar', count: 28, status: 'On Track', performance: 88 },
                { name: 'Finance Audit', head: 'Mrs. M. Singh', count: 15, status: 'On Track', performance: 95 },
            ].map((dept, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xs mr-3">
                                {dept.name.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{dept.name}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{dept.head}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div className="flex -space-x-2">
                            {[1,2,3].map(x => (
                                <div key={x} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                            ))}
                            <span className="ml-2 text-xs flex items-center text-slate-500">+{dept.count}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={dept.status === 'On Track' ? 'success' : 'warning'}>{dept.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-middle">
                        <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1">
                            <div className="bg-brand-600 h-1.5 rounded-full" style={{ width: `${dept.performance}%` }}></div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-brand-600 hover:text-brand-800 font-medium text-xs border border-brand-200 hover:bg-brand-50 px-3 py-1 rounded transition-colors">
                            Manage
                        </button>
                    </td>
                </tr>
            ))}
        </Table>
      </Card>
    </div>
  );
};

export default AdminDashboard;