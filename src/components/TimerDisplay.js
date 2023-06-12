import LiquidFillGauge from "react-liquid-gauge";

export function TimerDisplay({
  timerIsOn,
  elapsedTime,
  isFocused,
  sessionMinutes,
}) {

  function getFormattedTime(passedTime, totalTime) {
    const remainingTime = totalTime - passedTime;
    const minutes = Math.floor(remainingTime / 60);
    const secondsString =
      remainingTime % 60 < 10 ? "0" + (remainingTime % 60) : remainingTime % 60;
    return `${minutes}:${secondsString}`;
  }

  const currentTimeString = getFormattedTime(elapsedTime, sessionMinutes * 60);
  const remainingPercentage = Math.floor(
    (elapsedTime / (sessionMinutes * 60)) * 100
  );

  return (
    <div className="flex flex-col items-center">
      <LiquidFillGauge
        value={!timerIsOn && elapsedTime === 0 ? 30 : remainingPercentage}
        width={250}
        height={300}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={20}
        textRenderer={() => {
          return (
            <tspan>
              <tspan style={{ fontSize: "65px" }} className="value">
                {currentTimeString}
              </tspan>
            </tspan>
          );
        }}
        riseAnimation
        riseAnimationTime={1000}
        waveAnimation
        outerRadius={0.95}
        waveFrequency={2}
        waveAmplitude={timerIsOn ? 0 : 1}
        circleStyle={{
          fill: isFocused ? "#5AB9EA" : "#FFBD0B",
        }}
        waveStyle={{
          fill: isFocused ? "#5AB9EA" : "#FFBD0B",
        }}
        textStyle={{
          fill: "#555555",
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: "#fff",
          fontFamily: "Arial",
        }}
      />
    </div>
  );
}
