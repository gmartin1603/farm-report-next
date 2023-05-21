import React, { useEffect, useState } from "react";
import { useAppState } from "@/context/AppProvider";
import Select from "./inputs/Select";
import { useRouter } from "next/router";

function Row({ head, arr, removeItem, addItem }) {
  const initialState = {
    name: "",
    price: 0,
    qty: 0,
    total: 0,
  };
  const [{ expenses, report }, dispatch] = useAppState();

  const [expense, setExpense] = useState({});
  const [newRow, setNewRow] = useState(initialState);

  const router = useRouter();

  // useEffect(() => {
  //   console.log(expense);
  //   console.log(newRow);
  // }, [expense, newRow]);

  useEffect(() => {
    expenses.forEach((expense) => {
      if (expense.id === head) {
        setExpense(expense);
      }
    });
  }, [head, expenses]);

  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.name) {
      case "name":
        let option = expense.options.find(
          (obj) => obj.label === e.target.value
        );
        console.log(option);
        setNewRow((prev) => ({
          ...prev,
          name: e.target.value,
          price: option.price,
        }));
        break;
      default:
        setNewRow((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let obj = structuredClone(newRow);
    obj["id"] = Date.now();
    obj["arr"] = head;
    addItem(head, obj);
    // Clear form
    setNewRow({});
    setExpense(initialState);
  };

  const styles = {
    main: `w-full flex flex-col text-center my-[10px]`,
    print: `print:hidden`,
    heading: `font-bold text-lg underline`,
    lineItem: `w-full flex justify-between my-[4px]`,
    addBtn: `w-max font-bold text-lg bg-green-500 text-white px-2 rounded hover:bg-green-700 print:hidden`,
    deleteBtn: `w-max font-semi text-lg bg-red-500 text-white px-2 rounded hover:bg-red-700 print:hidden`,
  };
  if (!router.isFallback && !arr) {
    return <h1>Page Not Found</h1>;
  }
  return (
    <div className={`${styles.main} ${arr.length === 0 && styles.print}`}>
      <h5 className={styles.heading}>{head.toUpperCase()}</h5>
      {arr.length > 0 &&
        arr.map((obj) => (
          <div key={obj.id} className={styles.lineItem}>
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
                className={styles.deleteBtn}
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
      {newRow.id ? (
        <form onSubmit={(e) => handleAdd(e)}>
          <div className="w-full flex justify-between my-[4px]">
            <Select
              handleChange={handleChange}
              data={{
                id: "name",
                label: "Prouduct",
                options: expense.options,
              }}
              name="name"
              value={newRow.name}
            />
            <div className="flex">
              <input
                type="number"
                placeholder="Quantity"
                value={newRow.qty}
                onChange={(e) => setNewRow({ ...newRow, qty: e.target.value })}
              />
            </div>
            <Select
              handleChange={handleChange}
              data={{ id: "unit", label: "Unit", options: expense.units }}
              value={newRow.unit}
            />
            <div className="col">
              <input
                type="float"
                placeholder={"Price"}
                value={newRow.price}
                onChange={(e) =>
                  setNewRow({ ...newRow, price: e.target.value })
                }
              />
            </div>
            <div id="button" className="col">
              <button
                className="bg-green-500 text-white px-2 rounded hover:bg-green-700"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          id="type"
          onClick={() => setNewRow((prev) => ({ ...prev, id: Date.now() }))}
          className={styles.addBtn}
        >
          {" "}
          +{" "}
        </button>
      )}
    </div>
  );
}

export default Row;
