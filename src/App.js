
import React, { useState, useEffect } from "react";

function App() {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!desc || !amount) return alert("Please enter both description and amount.");
    setExpenses([...expenses, { desc, amount: parseFloat(amount) }]);
    setDesc("");
    setAmount("");
  };

  const deleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Expense Tracker</h2>
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button onClick={addExpense}>Add</button>
      <h3>Total: ${total.toFixed(2)}</h3>
      <ul>
        {expenses.map((e, i) => (
          <li key={i}>
            {e.desc} - ${e.amount}
            <button onClick={() => deleteExpense(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
