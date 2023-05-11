import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import ExpenseInput from './ExpenseInput';
import IncomeInput from './IncomeInput';
import DashboardItem from './DashboardItem';
import { isToday, parse } from 'date-fns';
import { firebase, db } from './firebase';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const totalIncome = income.reduce((total, income) => total + income.amount, 0);
  const balance = totalIncome - totalExpenses;

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

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

  useEffect(() => {
    const showNotification = (title, body) => {
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      }
    };

    const checkReminders = () => {
      expenses.forEach((expense) => {
        if (expense.reminderDate && isToday(parse(expense.reminderDate, 'MM/dd/yyyy', new Date()))) {
          showNotification('Expense Reminder', `Don't forget to pay ${expense.name} today.`);
        }
      });
    };

    const intervalId = setInterval(checkReminders, 60 * 1000); 

    return () => clearInterval(intervalId); 
  }, [expenses]);

  const removeExpense = async (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  
    try {
      await firebase.firestore().collection('expenses').doc(id).delete();
    } catch (error) {
      console.error('Error removing expense: ', error);
    }
  };
  
  const removeIncome = async (id) => {
    const updatedIncome = income.filter((income) => income.id !== id);
    setIncome(updatedIncome);
  
    try {
      await firebase.firestore().collection('income').doc(id).delete();
    } catch (error) {
      console.error('Error removing income: ', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Welcome Back To Your Dashboard!</h1>
      <p className="dashboard-subheader">Add income and expenses below:</p>
      <div className="dashboard-inputs">
        <IncomeInput income={income} setIncome={setIncome} /> 
        <ExpenseInput expenses={expenses} setExpenses={setExpenses} />
      </div>
      <div>

      </div>

      <div className="dashboard-list">
        {expenses.map((expense) => (
          <DashboardItem key={expense.id} type="expense" item={expense} removeItem={() => removeExpense(expense.id)} />
        ))}
        {income.map((income) => (
          <DashboardItem key={income.id} type="income" item={income} removeItem={() => removeIncome(income.id)} />
        ))}
      </div>
      <div className="dashboard-total">
        <p>Your Balance:</p>
        <p className={balance < 0 ? 'dashboard-expense' : 'dashboard-income'}>${balance}</p>
      </div>
    </div>
  );
};

export default Dashboard;



