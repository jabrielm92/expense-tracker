import React, { useState, useEffect } from 'react';
import './FinancialSummary.css';
import DashboardItem from './DashboardItem';
import { db } from './firebase';
import Chart from './Chart';

const FinancialSummary = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = income.reduce((total, income) => total + income.amount, 0);
  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    const fetchData = async () => {
      const expensesSnapshot = await db.collection('expenses').get();
      const expensesData = expensesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setExpenses(expensesData);

      const incomeSnapshot = await db.collection('income').get();
      const incomeData = incomeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setIncome(incomeData);
    };

    fetchData();
  }, []);

  return (
    <div className="financial-summary-container">
      <h1 className="financial-summary-header">Financial Summary</h1>
      <p className="financial-summary-subheader">Here's a summary of your expenses and income:</p>
      <div className="financial-summary-list">
        {expenses.map((expense) => (
          <DashboardItem key={expense.id} type="expense" item={expense} />
        ))}
        {income.map((income) => (
          <DashboardItem key={income.id} type="income" item={income} />
        ))}
      </div>
      <div className="financial-summary-chart">
      <Chart totalExpenses={totalExpenses} totalIncome={totalIncome} />
      </div>
      <div className="financial-summary-total">
        <p>Your Balance:</p>
        <p className={balance < 0 ? 'financial-summary-expense' : 'financial-summary-income'}>${balance}</p>
      </div>
    </div>
  );
};

export default FinancialSummary;



