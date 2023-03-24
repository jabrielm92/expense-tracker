import React, { useState } from 'react';
import './ExpenseInput.css';
import { db } from './firebase';

const ExpenseInput = ({ expenses, setExpenses }) => {
  const [newExpenseDueDate, setNewExpenseDueDate] = useState('');
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseReminderDate, setNewExpenseReminderDate] = useState('');

  const addExpense = () => {
    const newExpense = {
      id: expenses.length + 1,
      name: newExpenseName,
      category: newExpenseCategory,
      amount: parseFloat(newExpenseAmount),
      dueDate: new Date(newExpenseDueDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      reminderDate: newExpenseReminderDate ? new Date(newExpenseReminderDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }) : null,
    };
    db.collection('expenses').add(newExpense).then((docRef) => {
      setExpenses([...expenses, { ...newExpense, id: docRef.id }]);
      setNewExpenseName('');
      setNewExpenseCategory('');
      setNewExpenseAmount('');
      setNewExpenseDueDate('');
      setNewExpenseReminderDate('');
    });
  };

  const shouldShowDueDateAndReminder = newExpenseName && newExpenseCategory && newExpenseAmount;

  return (
    <div className="expense-inputs">
      <h2>Add Expense</h2>
      <div className="input-box">
        <input type="text" placeholder="Name" value={newExpenseName} onChange={(e) => setNewExpenseName(e.target.value)} />
        <input type="text" placeholder="Category" value={newExpenseCategory} onChange={(e) => setNewExpenseCategory(e.target.value)} />
        <input type="number" placeholder="Amount" value={newExpenseAmount} onChange={(e) => setNewExpenseAmount(e.target.value)} />
        {shouldShowDueDateAndReminder && (
          <>
            <label htmlFor="due-date">Due Date</label>
            <input id="due-date" type="date" value={newExpenseDueDate} onChange={(e) => setNewExpenseDueDate(e.target.value)} />
            <label htmlFor="reminder-date">Reminder Date</label>
            <input id="reminder-date" type="date" value={newExpenseReminderDate} onChange={(e) => setNewExpenseReminderDate(e.target.value)} />
          </>
        )}
        <button className="dashboard-add-button" onClick={addExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseInput;





