import { useState } from "react";
import { TimerToggle } from "./TimerToggle";
import { NewTimer } from "./NewTimer";

export function TimerContainer() {
  const [isFocused, setIsFocused] = useState(true);

  return (
    <>
      <TimerToggle isFocused={isFocused} setIsFocused={setIsFocused} />
    </>
  );
}
