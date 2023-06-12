export function TimerToggle({ isFocused, setIsFocused }) {
  const unToggledButtonClass = "ring-1 ring-inset ring-gray-500 text-gray-500 hover:bg-gray-600 hover:text-slate-100 px-4 py-2 w-24 transition duration-200 ease-in-out";
  const toggledButtonClass = "ring-1 ring-inset ring-gray-500 text-slate-100 bg-gray-600 px-4 py-2 w-24";

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isFocused) return;
          setIsFocused(true);
        }}
        className={`rounded-l-md ${isFocused ? toggledButtonClass : unToggledButtonClass}`}
      >
        Focus
      </button>
      <button
        type="button"
        onClick={() => {
          if (!isFocused) return;
          setIsFocused(false);
        }}
        className={`rounded-r-md ${!isFocused ? toggledButtonClass : unToggledButtonClass}`}
      >
        Break
      </button>
    </div>
  );
}
