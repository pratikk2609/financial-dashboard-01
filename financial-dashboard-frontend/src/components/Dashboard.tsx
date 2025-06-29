import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, Typography, Button } from '@mui/material';
import TransactionTable from './TransactionTable';
import CSVExportModal from './CSVExportModal';

interface Transaction {
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<{ type: string; total: number }[]>(
    []
  );
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get<Transaction[]>(
          'http://localhost:5000/api/transactions',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;
        setTransactions(data);

        const revenue = data.filter((t: Transaction) => t.category === 'Revenue');
        const expense = data.filter((t: Transaction) => t.category === 'Expense');

        setChartData([
          {
            type: 'Revenue',
            total: revenue.reduce(
              (a: number, b: Transaction) => a + b.amount,
              0
            ),
          },
          {
            type: 'Expense',
            total: expense.reduce(
              (a: number, b: Transaction) => a + b.amount,
              0
            ),
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        style={{ position: 'absolute', top: 20, right: 20 }}
      >
        Logout
      </Button>

      <Typography variant="h4" gutterBottom>
        Financial Dashboard
      </Typography>

      {/* Summary Cards without MUI Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <Card sx={{ flex: 1, backgroundColor: '#e3f2fd', padding: '20px', minWidth: '200px' }}>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h4" color="primary">
            ₹{chartData.find((d) => d.type === 'Revenue')?.total.toLocaleString() || 0}
          </Typography>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: '#ffebee', padding: '20px', minWidth: '200px' }}>
          <Typography variant="h6">Total Expense</Typography>
          <Typography variant="h4" color="error">
            ₹{chartData.find((d) => d.type === 'Expense')?.total.toLocaleString() || 0}
          </Typography>
        </Card>

        <Card sx={{ flex: 1, backgroundColor: '#e8f5e9', padding: '20px', minWidth: '200px' }}>
          <Typography variant="h6">Net Balance</Typography>
          <Typography variant="h4" color="success.main">
            ₹{(
              (chartData.find((d) => d.type === 'Revenue')?.total || 0) -
              (chartData.find((d) => d.type === 'Expense')?.total || 0)
            ).toLocaleString()}
          </Typography>
        </Card>
      </div>

      <Typography variant="h5" gutterBottom>
        Revenue vs Expenses
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>

      <Button
        onClick={() => setShowExportModal(true)}
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Export CSV
      </Button>

      {showExportModal && (
        <CSVExportModal
          data={transactions}
          onClose={() => setShowExportModal(false)}
        />
      )}

      <TransactionTable data={transactions}/>
    </div>
  );
};

export default Dashboard;
