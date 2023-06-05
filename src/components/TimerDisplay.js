import LiquidFillGauge from 'react-liquid-gauge';

export function TimerDisplay({
  timerIsOn,
  startTimer,
  pauseTimer,
  currentTimeString,
  elapsedTime,
  remainingPercentage,
  isFocused
}) {
  const buttonClass =
    "rounded-md ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-4 py-2 w-24 transition duration-200 ease-in-out";

  return (
    <div className='flex flex-col items-center'>
      <LiquidFillGauge
        value={
          !timerIsOn && elapsedTime === 0 ? 30 : remainingPercentage
        }
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
      {timerIsOn ? (
        <button className={buttonClass} type="button" onClick={pauseTimer}>
          Pause
        </button>
      ) : (
        <button className={buttonClass} type="button" onClick={startTimer}>
          Start
        </button>
      )}
    </div>
  );
}
