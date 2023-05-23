import React, { useEffect, useState } from "react";
import { useAppState } from "@/context/AppProvider";
import Select from "./inputs/Select";
import { useRouter } from "next/router";
import Input from "./inputs/Input";
import dynamic from "next/dynamic";

function NoSSRRow({ id, head, arr, removeItem, addItem }) {
  const initialState = {
    name: "",
    unit: "",
    price: 0,
    qty: 0,
    total: 0,
    newName: false,
    newUnit: false,
  };
  const [{ expenses, report, user }, dispatch] = useAppState();

  const [expense, setExpense] = useState({});
  const [newRow, setNewRow] = useState(initialState);

  const router = useRouter();

  // useEffect(() => {
  //   // console.log(expense);
  //   console.log(newRow);
  // }, [expense, newRow]);

  useEffect(() => {
    expenses.forEach((expense) => {
      if (expense.id === id) {
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
        if (!option) {
          setNewRow((prev) => ({
            ...prev,
            newName: true,
          }));
        } else {
          console.log(option);
          setNewRow((prev) => ({
            ...prev,
            name: e.target.value,
            price: option.price,
          }));
        }
        break;
      case "unit":
        if (!expense.units.includes(e.target.value)) {
          setNewRow((prev) => ({
            ...prev,
            newUnit: true,
          }));
        } else {
          setNewRow((prev) => ({
            ...prev,
            unit: e.target.value,
          }));
        }
        break;
      default:
        setNewRow((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    let obj = structuredClone(newRow);
    obj["id"] = Date.now();
    obj["arr"] = id;
    addItem(id, obj);
    if (newRow.newName || newRow.newUnit) {
      const prompt = confirm("Save new line item details?");
      if (prompt) {
        let newExpense = { ...expense };
        if (newRow.newName) {
          newExpense.options.push({
            label: newRow.name,
            price: newRow.price,
          });
        }
        if (!newExpense.units.includes(newRow.unit)) {
          newExpense.units.push(newRow.unit);
        }
        console.log(newExpense);
        await fetch(
          "http://127.0.0.1:5001/farm-report-86ac2/us-central1/saveItem",
          {
            method: "POST",
            body: JSON.stringify({ coll: user, item: newExpense }),
          }
        )
          .then((res) => res.json())
          .then((data) => console.log(JSON.parse(data).message));
      }
    }
    // Clear form
    setNewRow(initialState);
  };

  const styles = {
    main: `w-full flex flex-col text-center my-[10px]`,
    print: `print:hidden`,
    heading: `font-bold text-lg underline`,
    lineItem: `w-full flex justify-between my-[4px] border border-gray-400 rounded-md p-2 print:my-0 print:border-none print:rounded-none print:p-0`,
    addBtn: `w-max font-bold text-lg bg-green-500 text-white px-2 rounded hover:bg-green-700 print:hidden`,
    deleteBtn: `w-max font-semibold bg-red-500 text-white px-2 rounded hover:bg-red-700 print:hidden`,
  };

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
        <form className={styles.lineItem} onSubmit={(e) => handleAdd(e)}>
          <div className="w-full flex justify-around my-[4px]">
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={(e) => {
                e.preventDefault;
                setNewRow(initialState);
              }}
            >
              X
            </button>
            {newRow.newName ? (
              <Input
                type="text"
                label="New Product:"
                row
                value={newRow.name}
                handleChange={(e) =>
                  setNewRow((prev) => ({ ...prev, name: e.target.value }))
                }
                id="name"
              />
            ) : (
              <Select
                handleChange={handleChange}
                data={{
                  id: "name",
                  label: "Prouduct",
                  options: [...expense.options, { label: "Add New", price: 0 }],
                }}
                name="name"
                value={newRow.name}
              />
            )}
            <Input
              type="float"
              label="Quantity:"
              row
              value={newRow.qty}
              handleChange={(e) =>
                setNewRow((prev) => ({ ...prev, qty: e.target.value }))
              }
              id="qty"
            />
            {newRow.newUnit ? (
              <Input
                type="text"
                label="New Unit:"
                row
                value={newRow.unit}
                handleChange={(e) =>
                  setNewRow((prev) => ({ ...prev, unit: e.target.value }))
                }
                id="unit"
              />
            ) : (
              <Select
                handleChange={handleChange}
                name="unit"
                data={{
                  id: "unit",
                  label: "Unit",
                  options: [...expense.units, "Add New"],
                }}
                value={newRow.unit}
              />
            )}
            <Input
              type="float"
              label="Price per unit:"
              row
              value={newRow.price}
              handleChange={(e) =>
                setNewRow((prev) => ({ ...prev, price: e.target.value }))
              }
              id="price"
            />
            <button className={styles.addBtn} type="submit">
              Add
            </button>
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

// export it with SSR disabled
const Row = dynamic(() => Promise.resolve(NoSSRRow), {
  ssr: false,
});

export default Row;
