export function TodoListItem({ todoItem }) {
  return (
    <div key={todoItem.id}>
      <h2>{todoItem.taskName}</h2>
    </div>
  );
}
