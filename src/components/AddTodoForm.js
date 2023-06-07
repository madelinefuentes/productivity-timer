import { useState } from "react";

export function AddTodoForm({ setShowAddTodoForm, addTask }) {
  const [taskName, setTaskName] = useState(null);
  const [pomodoros, setPomodoros] = useState(1);

  function handleAddTask() {
    addTask(taskName, pomodoros);
    setTaskName(null);
    setPomodoros(0);
  }

  function handlePomodoroChange(event) {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value < 100) {
      setPomodoros(value);
    }
  }

  return (
    <div className="flex flex-col mt-4 items-center">
      <input
        className="w-8/12 h-9 rounded-sm ring-1 ring-inset ring-slate-300 placeholder:pl-4"
        type="text"
        placeholder="Enter a Task to Work On"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <label className="mt-3 flex gap-3">
        <p>Pomodoro:</p>
        <input
          className="w-10 h-7 rounded-sm ring-1 ring-inset ring-slate-300"
          value={pomodoros}
          onChange={(e) => handlePomodoroChange(e)}
        />
      </label>
      <div className="mt-2 mb-5 flex gap-4">
        <button
          className="rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-3 py-2 w-20 transition duration-200 ease-in-out"
          onClick={() => setShowAddTodoForm(false)}
        >
          Close
        </button>
        <button
          className="rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-3 py-2 w-20 transition duration-200 ease-in-out"
          onClick={handleAddTask}
          disabled={taskName == null || taskName.length < 1}
        >
          Add
        </button>
      </div>
    </div>
  );
}
