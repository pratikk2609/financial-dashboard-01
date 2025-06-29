import React, { useState } from 'react';

interface Transaction {
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
}

interface Props {
  data: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ data }) => {
  const [search, setSearch] = useState('');

  const filtered = data.filter((t) => {
    const term = search.toLowerCase();
    return (
      t.status.toLowerCase().includes(term) ||
      t.category.toLowerCase().includes(term) ||
      t.user_id.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ marginTop: '2rem' }}>
      <input
        type="text"
        placeholder="Search by status, category, or user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '1rem' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Amount</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Category</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>User</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t, idx) => (
            <tr key={idx}>
              <td style={{ padding: '8px' }}>{t.date}</td>
              <td style={{ padding: '8px' }}>{t.amount}</td>
              <td style={{ padding: '8px' }}>{t.category}</td>
              <td style={{ padding: '8px' }}>{t.status}</td>
              <td style={{ padding: '8px' }}>{t.user_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
