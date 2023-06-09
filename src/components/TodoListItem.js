import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export function TodoListItem({ todoItem }) {
  return (
    <div
      key={todoItem.id}
      className="group flex justify-between px-5 py-3 my-2 border border-slate-400 rounded-md items-center"
    >
      <h2>{todoItem.taskName}</h2>
      {/* <div className="opacity-0 transition duration-200 group-hover:opacity-100">
        <FontAwesomeIcon icon={faTrashCan} className="text-slate-500" />
      </div> */}
      <p>{`${todoItem.pomodoros} / ${todoItem.pomodoroTarget}`}</p>
    </div>
  );
}
