import React from "react";
import { useAppState } from "../../context/AppProvider";
import Select from "./inputs/Select";

const SideBar = ({}) => {
  const [{ names, commodities, years, expenses, profile, report }, dispatch] =
    useAppState();

  let url = "http://localhost:5001/farm-report-86ac2/us-central1/writeData";

  const handleCall = async (e) => {
    e.preventDefault();
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
  };

  const styles = {
    main: `fixed left-4 h-[100vh] w-[20%] flex flex-col items-center justify-start print:hidden`,
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
