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
      className={`group flex justify-between px-4 py-3 my-2 border border-slate-400 rounded-md items-center gap-3 ${
        todoItem.id === currentTask ? "border-l-[5px]" : ""
      }`}
      onClick={() =>
        setCurrentTask((prevTask) =>
          prevTask === todoItem.id ? null : todoItem.id
        )
      }
    >
      <h2>{todoItem.taskName}</h2>
      <div className="flex items-center gap-1">
        <p className="whitespace-nowrap text-slate-400">{`${todoItem.pomodoros} / ${todoItem.pomodoroTarget}`}</p>
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-slate-400 hover:cursor-pointer p-3"
          onClick={(event) => {
            event.stopPropagation();
            removeTask(todoItem.id);
          }}
        />
      </div>
    </div>
  );
}
