import React from 'react';
import './DashboardItem.css';

const DashboardItem = ({ type, item, removeItem }) => {
  return (
    <div className={`dashboard-item ${type}`} key={item.id}>
      <div className="dashboard-item-description">
        <span className="dashboard-item-category">{item.category}</span>
        <span className="dashboard-item-name">{item.name}</span>
      </div>
      <span className="dashboard-item-amount">${item.amount}</span>
      {type === 'expense' && (
        <>
          <span className="dashboard-item-due-date">{item.dueDate}</span>
          {item.reminderDate && <span className="dashboard-item-reminder-date">Reminder: {item.reminderDate}</span>}
        </>
      )}
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </div>
  );
};

export default DashboardItem;
