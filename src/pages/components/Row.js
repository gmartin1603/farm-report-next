import React, { useEffect, useState } from "react";
import { useAppState } from "@/context/AppProvider";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import commonAPI from "../api/common";
import {
  Button,
  FormControl,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CancelPresentationOutlined, PlaylistAddCheck } from "@mui/icons-material";

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
  const [nameError, setNameError] = useState(false);
  const [newUnitError, setNewUnitError] = useState(false);

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
            name: "",
          }));
        } else {
          console.log(option);
          setNewRow((prev) => ({
            ...prev,
            name: e.target.value,
            price: option.price,
            unit: option.unit ? option.unit : "",
          }));
        }
        break;
      case "unit":
        if (!expense.units.includes(e.target.value)) {
          setNewRow((prev) => ({
            ...prev,
            newUnit: true,
            unit: "",
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
            unit: newRow.unit,
          });
        }
        if (!newExpense.units.includes(newRow.unit)) {
          newExpense.units.push(newRow.unit);
        }
        console.log(newExpense);
        // await fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify({ coll: user, item: newExpense }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => console.log(JSON.parse(data).message));
        commonAPI("saveItem", { user: user, data: newExpense })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    }
    // Clear form
    setNewRow(initialState);
  };

  const styles = {
    main: `w-full flex flex-col text-center my-[10px]`,
    print: `print:hidden`,
    heading: `font-bold text-lg underline`,
    lineItem: `w-full flex justify-between my-[4px] p-2 print:my-0 print:border-none print:rounded-none print:p-0`,
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
          <div className="w-full flex justify-around items-center my-[4px]">
            <IconButton
              data-cy="row-cancel-btn"
              variant="outlined"
              size="small"
              color="error"
              title="Cancel"
              onClick={(e) => {
                e.preventDefault;
                setNewRow(initialState);
              }}
              aria-label="cancel"
            >
              <CancelPresentationOutlined />
            </IconButton>
            {newRow.newName ? (
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <TextField
                  data-cy="row-name-input"
                  id="name"
                  label="New Name"
                  variant="filled"
                  size="small"
                  value={newRow.name}
                  onChange={handleChange}
                  error={nameError}
                  helperText={nameError ? "Name already exists" : ""}
                />
              </FormControl>
            ) : (
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="name-select-label">Name</InputLabel>
                <Select
                  data-cy="report-name-select"
                  labelId="name-select-label"
                  id="name-select"
                  name="name"
                  size="small"
                  value={newRow.name}
                  label="Name"
                  formhelpertext="Error"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...expense.options, { label: "Add New", price: 0 }].map(
                    (item) => (
                      <MenuItem key={item.label} value={item.label}>
                        {item.label}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            )}
            <TextField
              data-cy="row-qty-input"
              id="qty"
              size="small"
              label="Quantity"
              variant="filled"
              value={newRow.qty}
              onChange={handleChange}
            />
            {newRow.newUnit ? (
              <TextField
                data-cy="row-unit-input"
                id="unit"
                size="small"
                label="New Unit"
                variant="filled"
                value={newRow.unit}
                onChange={handleChange}
                error={newUnitError}
                helperText={newUnitError ? "Unit already exists" : ""}
              />
            ) : (
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="unit-select-label">Unit</InputLabel>
                <Select
                  data-cy="report-unit-select"
                  labelId="unit-select-label"
                  id="unit-select"
                  name="unit"
                  size="small"
                  value={newRow.unit}
                  label="Unit"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {[...expense.units, "Add New"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <TextField
                data-cy="row-price-input"
                margin="dense"
                id="price"
                size="small"
                label="Price"
                variant="filled"
                value={newRow.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <Button
                data-cy="row-cancel-btn"
                id="type"
                startIcon={<PlaylistAddCheck />}
                variant="outlined"
                size="small"
                color="success"
                title="Save"
                aria-label="save"
                type="submit"
              >
                Add Row
              </Button>
            </FormControl>
            {/* <button className={styles.addBtn} type="submit">
              Add
            </button> */}
          </div>
        </form>
      ) : (
        // <IconButton
        //   data-cy="row-cancel-btn"
        //   id="type"
        //   variant="outlined"
        //   size="small"
        //   color="success"
        //   title="Save"
        //   aria-label="save"
        //   onClick={() => setNewRow((prev) => ({ ...prev, id: Date.now() }))}
        // >
        //   <CancelPresentationOutlined />
        // </IconButton>
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
