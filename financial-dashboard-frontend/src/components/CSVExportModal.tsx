import React from 'react';

interface Transaction {
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
}

interface Props {
  data: Transaction[];
  onClose: () => void;
}

const CSVExportModal: React.FC<Props> = ({ data, onClose }) => {
  const downloadCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map((t) => Object.values(t).join(',')).join('\n');
    const csvContent = [headers, rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transactions.csv';
    link.click();
    onClose();
  };

  return (
    <div style={{ background: '#fff', padding: '20px' }}>
      <h3>Export Transactions</h3>
      <button onClick={downloadCSV}>Download CSV</button>
      <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
    </div>
  );
};

export default CSVExportModal;
