import React, { useEffect, useState } from "react";
import { useAppState } from "../../context/AppProvider";
import Select from "./inputs/Select";
import Input from "./inputs/Input";

const SideBar = ({}) => {
  const [{ names, commodities, years, expenses, profile, report }, dispatch] =
    useAppState();

  const [active, setActive] = useState({});
  const [newRow, setNewRow] = useState({});

  useEffect(() => {
    console.log(active);
    console.log(newRow);
  }, [active, newRow]);

  const handleAdd = (e) => {
    e.preventDefault();
    let obj = structuredClone(newRow);
    obj["id"] = Date.now();
    obj["arr"] = active.id;
    dispatch({ type: "ADD-ROW", name: active.id, load: obj });
    setNewRow({});
    setActive({});
  };

  const handleCall = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5001/farm-report-86ac2/us-central1/convertData";
    const body = { coll: profile.uid };
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    switch (e.target.id) {
      case "type":
        expenses.forEach((expense) => {
          if (expense.label === e.target.value) {
            setActive(expense);
          }
        });
        break;
      default:
        setNewRow((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const styles = {
    main: `fixed left-4 h-[100vh] w-[20%] flex flex-col items-center justify-start`,
    container: `w-full flex flex-col items-center justify-around bg-blue-600 mb-5 p-1 rounded-b`,
    label: `text-xl font-semibold bg-blue-800 w-full text-center rounded-t`,
  };

  return (
    <div className={styles.main}>
      <label htmlFor="title-inputs" className={styles.label}>
        Title Inputs
      </label>
      <div name="title-inputs" className={styles.container}>
        <Select
          handleChange={handleChange}
          data={{ id: "name", label: "Land Lord", options: names }}
        />
        <Select
          handleChange={handleChange}
          data={{ id: "commodity", label: "Crop", options: commodities }}
        />
        <Select
          handleChange={handleChange}
          data={{ id: "year", label: "Year", options: years }}
        />
      </div>
      <label htmlFor="expense-inputs" className={styles.label}>
        Expense Inputs
      </label>
      <div name="expense-inputs" className={styles.container}>
        <Select
          handleChange={handleChange}
          data={{ id: "type", label: "Type", options: expenses }}
          value={active.label}
        />
        {active.label && (
          <>
            <Select
              handleChange={handleChange}
              data={{ id: "name", label: "Prouduct", options: active.options }}
              value={newRow.name}
            />
            <Select
              handleChange={handleChange}
              data={{ id: "unit", label: "Unit", options: active.units }}
              value={newRow.unit}
            />
            <Input
              type="number"
              id="qty"
              label="Quantity"
              handleChange={handleChange}
              value={active.quantity}
            />
            <Input
              type="number"
              id="price"
              label="Price"
              handleChange={handleChange}
              value={active.price}
            />
            <button
              className={`bg-green-500 w-full m-[4px] rounded py-[1%] font-semibold hover:bg-green-400 border border-green-600 hover:border-green-500`}
              onClick={(e) => handleAdd(e)}
            >
              Add
            </button>
          </>
        )}
      </div>
      <div className={styles.container}>
        <button
          onClick={(e) => handleCall(e)}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          AUX Call BTN
        </button>
      </div>
    </div>
  );
};

export default SideBar;
