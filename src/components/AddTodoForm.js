import { useState } from "react";

export function AddTodoForm({ setShowAddTodoForm }) {
  const [taskName, setTaskName] = useState(null);
  const [pomodoros, setPomodoros] = useState(1);

  return (
    <>
      <input type="text" placeholder="Enter a Task to Work On" />
      <button onClick={() => setShowAddTodoForm(false)}>Cancel</button>
      <button>Add</button>
    </>
  );
}
