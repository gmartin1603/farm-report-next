import React from "react";
import Item from "./Item";
import { useAppState } from "@/context/AppProvider";

function Row({ head, arr, removeItem }) {
  const [{ report }, dispatch] = useAppState();

  const styles = {
    main: ``,
  };
  return (
    <div className={"w-full flex flex-col text-center my-[10px]"}>
      <h5 className={`font-bold text-lg underline`}>{head.toUpperCase()}</h5>
      {report[arr].length > 0 &&
        report[arr].map((obj) => (
          <div key={obj.id} className="w-full flex justify-between my-[4px]">
            <div className="font-semibold">
              <p>{obj.name}</p>
            </div>
            <div className="flex">
              {obj.qty > 1 ? (
                <p>
                  {obj.qty} <b>{obj.unit + "s"}</b>
                </p>
              ) : (
                <p>
                  {obj.qty} <b>{obj.unit}</b>
                </p>
              )}
              <div className="w-[4px]" />
              <p>
                @ ${obj.price} <b>per {obj.unit}</b>
              </p>
            </div>
            <div className="col">
              <p>
                <b>Total:</b> ${(obj.price * obj.qty).toFixed(2)}
              </p>
            </div>
            <div id="button" className="col">
              <button
                className="bg-red-500 text-white px-2 rounded hover:bg-red-700"
                onClick={(e) => {
                  e.preventDefault;
                  removeItem(obj.arr, obj.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Row;
const Main = `
    h5 {
        border-bottom: 1px, solid;
    }
`;
const Expense = `
  display: flex;
  flex-direction: column;
`;
