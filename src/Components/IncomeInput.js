import React, { useState } from 'react';
import './IncomeInput.css';
import { db } from './firebase';

const IncomeInput = ({ income, setIncome }) => {
  const [newIncomeDate, setNewIncomeDate] = useState('');
  const [newIncomeName, setNewIncomeName] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');
  const [newIncomeAmount, setNewIncomeAmount] = useState('');

  const addIncome = () => {
    const newIncome = {
      id: income.length + 1,
      name: newIncomeName,
      category: newIncomeCategory,
      amount: parseFloat(newIncomeAmount),
      date: new Date(newIncomeDate).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    db.collection('income').add(newIncome).then((docRef) => {
      setIncome([...income, { ...newIncome, id: docRef.id }]);
      setNewIncomeName('');
      setNewIncomeCategory('');
      setNewIncomeAmount('');
      setNewIncomeDate('');
    });
  };

  const shouldShowAllInputs = newIncomeName && newIncomeCategory && newIncomeAmount;

  return (
    <div className="income-inputs">
      <h2>Add Income</h2>
      <div className="input-box">
        <input type="text" placeholder="Name" value={newIncomeName} onChange={(e) => setNewIncomeName(e.target.value)} />
        <input type="text" placeholder="Category" value={newIncomeCategory} onChange={(e) => setNewIncomeCategory(e.target.value)} />
        <input type="number" placeholder="Amount" value={newIncomeAmount} onChange={(e) => setNewIncomeAmount(e.target.value)} />
        {shouldShowAllInputs && (
          <>
            <label htmlFor="income-date">Date</label>
            <input id="income-date" type="date" value={newIncomeDate} onChange={(e) => setNewIncomeDate(e.target.value)} />
          </>
        )}
        <button className="dashboard-add-button" onClick={addIncome}>
          Add Income
        </button>
      </div>
    </div>
  );
};

export default IncomeInput;


