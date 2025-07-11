"use client";
import { useState } from 'react';

export default function StudyTrackerApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shopItems, setShopItems] = useState([
    { name: "1 Hour Game Time", cost: 50 },
    { name: "Watch a Movie", cost: 100 },
    { name: "Treat Yourself", cost: 150 },
  ]);
  const [ownedItems, setOwnedItems] = useState([]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { name: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    if (!updated[index].done) {
      setXp(xp + 10);
    }
  };

  const completePomodoro = () => {
    setPomodoroCount(pomodoroCount + 1);
    setXp(xp + 25);
    setStreak(streak + 1);
  };

  const buyItem = (item) => {
    if (xp >= item.cost) {
      setXp(xp - item.cost);
      setOwnedItems([...ownedItems, item.name]);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Level Up: Study Tracker</h1>
      <div>
        <h2>Add Study Task</h2>
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="e.g. Read DBMS Chapter 2" />
        <button onClick={addTask}>Add</button>
      </div>
      <div>
        <h2>Today's Tasks</h2>
        <ul>
          {tasks.map((task, i) => (
            <li key={i} onClick={() => toggleTask(i)} style={{ textDecoration: task.done ? 'line-through' : 'none', cursor: 'pointer' }}>
              {task.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Pomodoro Tracker</h2>
        <p>You’ve completed {pomodoroCount} Pomodoro sessions today.</p>
        <button onClick={completePomodoro}>Complete Pomodoro</button>
      </div>
      <div>
        <h2>XP & Streak</h2>
        <p>XP: {xp}</p>
        <p>Focus Streak: {streak} days</p>
      </div>
      <div>
        <h2>Shop</h2>
        {shopItems.map((item, index) => (
          <div key={index}>
            <span>{item.name} - {item.cost} XP</span>
            <button onClick={() => buyItem(item)} disabled={xp < item.cost}>Buy</button>
          </div>
        ))}
        <h3>Owned Items:</h3>
        <ul>
          {ownedItems.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
      }
