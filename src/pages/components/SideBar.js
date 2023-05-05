import React, { useEffect, useState } from "react"
import { useAppState } from "../../context/AppProvider"
import Select from "./inputs/Select"
import Input from "./inputs/Input"

const SideBar = ({}) => {

  const [{names, commodities, years, expenses}, dispatch] = useAppState()

  const [active, setActive] = useState({})

  useEffect(() => {
    console.log(active)
  }, [active]);

  const handleChange = (e) => {
    console.log(e.target.value)
    switch (e.target.id) {
      case "type":
        expenses.forEach(expense => {
          if (expense.label === e.target.value) {
            setActive(expense)
          }
        })
        break
      default:
      dispatch({type: "UPDATE-REPORT", name: e.target.id, load: e.target.value})
    }
  }

  const styles = {
      main:`h-[100vh] w-[20%] flex flex-col items-center justify-start`,
      container:`w-full flex flex-col items-center justify-around bg-blue-600 mb-5 p-1 rounded-b`,
      label:`text-xl font-semibold bg-blue-800 w-full text-center rounded-t`,
  }

  return (
    <div className={styles.main}>
      <label htmlFor="title-inputs" className={styles.label}>Title Inputs</label>
      <div name="title-inputs" className={styles.container}>
        <Select
        handleChange={handleChange}
        data={{id:"name", label: "Land Lord", options: names}}
        />
        <Select
        handleChange={handleChange}
        data={{id:"commodity", label: "Crop", options: commodities}}
        />
        <Select
        handleChange={handleChange}
        data={{id:"year", label: "Year", options: years}}
        />
      </div>
      <label htmlFor="expense-inputs" className={styles.label}>Expense Inputs</label>
      <div name="expense-inputs" className={styles.container}>
        <Select
        handleChange={handleChange}
        data={{id:"type", label: "Type", options: expenses}}
        />
        {active.label &&
          <>
          <Select
          handleChange={handleChange}
          data={{id:"item", label: "Prouduct", options: active.options}}
          />
          <Select
          handleChange={handleChange}
          data={{id:"unit", label: "Unit", options: active.units}}
          />
          <Input
          type="number"
          id="quantity"
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
          </>
        }
      </div>
    </div>
  )
}

export default SideBar
