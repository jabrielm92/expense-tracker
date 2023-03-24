import React from 'react';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const COLORS = ['#D92E1D', '#2ECC40']; // red for expenses and money green for income

const Chart = ({ totalExpenses, totalIncome }) => {
  const data = [
    { name: 'Expenses', value: totalExpenses },
    { name: 'Income', value: totalIncome },
  ];

  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        labelLine={false}
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend
        wrapperStyle={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#2C5F2D',
        }}
      />
      <Tooltip formatter={formatCurrency} />
    </PieChart>
  );
};

export default Chart;


