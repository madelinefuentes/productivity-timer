import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function TodoListItem({
  todoItem,
  removeTask,
  currentTask,
  setCurrentTask,
}) {
  return (
    <div
      key={todoItem.id}
      className={`group flex justify-between px-5 py-3 my-2 border border-slate-400 rounded-md items-center ${
        todoItem.id === currentTask ? "border-l-[5px] border-[#5AB9EA]" : ""
      }`}
      onClick={() =>
        setCurrentTask((prevTask) =>
          prevTask === todoItem.id ? null : todoItem.id
        )
      }
    >
      <h2>{todoItem.taskName}</h2>
      <div className="opacity-0 transition duration-200 group-hover:opacity-100">
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-slate-500"
          onClick={() => removeTask(todoItem.id)}
        />
      </div>
      <p>{`${todoItem.pomodoros} / ${todoItem.pomodoroTarget}`}</p>
    </div>
  );
}
