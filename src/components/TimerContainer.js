import { useState } from "react";
import { TimerToggle } from "./TimerToggle";
import { NewTimer } from "./NewTimer";

export function TimerContainer(props) {
  const [isFocused, setIsFocused] = useState(true);

  return (
    <div className="flex flex-col items-center pt-16">
      <TimerToggle isFocused={isFocused} setIsFocused={setIsFocused} />
      <NewTimer isFocused={isFocused} {...props} />
    </div>
  );
}
