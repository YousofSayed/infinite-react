import { addClickClass } from "../../../helpers/cocktail";

export const SidesControllers = ({ option, setOption }) => {
  /**
   *
   * @param {MouseEvent} ev
   * @param {string} option
   */
  const onClick = (ev, optionVal) => {
    setOption(option == optionVal ? "" : optionVal);
  };

  return (
    <section className="p-2 w-full bg-slate-800 rounded-lg  flex justify-between items-center">
      <div
        className={`cursor-pointer  flex justify-center items-center rounded-lg ${
          option == "all" ? "p-2 bg-gray-900 " : ""
        } transition-all`}
      >
        <button
          onClick={(ev) => {
            addClickClass(ev.target, "click");
            onClick(ev, "all");
          }}
          className={`w-[20px] h-[20px] border-2 ${
            option == "all" ? "border-blue-500" : "border-slate-500"
          } cursor-pointer transition-all`}
        ></button>
      </div>

      <div
        className={`cursor-pointer flex justify-center items-center rounded-lg ${
          option == "tb" ? "p-2 bg-gray-900 " : ""
        } transition-all`}
      >
        <button
          onClick={(ev) => {
            addClickClass(ev.target, "click");
            onClick(ev, "tb");
          }}
          className={`w-[20px] h-[20px] border-2 border-transparent ${
            option == "tb"
              ? "border-b-blue-500 border-t-blue-500"
              : "border-b-slate-500 border-t-slate-500"
          }  cursor-pointer transition-all`}
        ></button>
      </div>

      <div
        className={` cursor-pointer flex justify-center items-center rounded-lg ${
          option == "lr" ? "p-2 bg-gray-900 " : ""
        } transition-all`}
      >
        <button
          onClick={(ev) => {
            addClickClass(ev.target, "click");
            onClick(ev, "lr");
          }}
          className={`w-[20px] h-[20px] border-2 border-transparent ${
            option == "lr"
              ? "border-l-blue-500 border-r-blue-500"
              : "border-l-slate-500 border-r-slate-500"
          } cursor-pointer transition-all`}
        ></button>
      </div>
    </section>
  );
};
