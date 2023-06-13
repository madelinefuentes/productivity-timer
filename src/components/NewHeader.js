import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function NewHeader() {
  return (
    <div className="h-12 bg-slate-50 flex justify-center">
      <div className="w-[500px] flex justify-between text-xl text-slate-600 font-light items-center">
        <h1>Productivity Timer</h1>
        <FontAwesomeIcon
          icon={faBars}
          className="text-slate-600 hover:cursor-pointer p-3"
        />
      </div>
    </div>
  );
}
