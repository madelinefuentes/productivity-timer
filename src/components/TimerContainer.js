import { useState } from "react";
import { TimerToggle } from "./TimerToggle";
import { NewTimer } from "./NewTimer";
import { NewTodoList } from './NewTodoList';
import { NewHeader } from "./NewHeader";

export function TimerContainer(props) {
  const [isFocused, setIsFocused] = useState(true);

  return (
    <>
      <NewHeader/>
      <div className="flex flex-col items-center pt-16">
        <TimerToggle isFocused={isFocused} setIsFocused={setIsFocused} />
        <NewTimer isFocused={isFocused} {...props} />
        <NewTodoList />
      </div>
    </>
  );
}
