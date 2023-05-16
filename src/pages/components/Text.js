import React, { useState } from "react";
// import { writeReport } from '../firebase/firestore';
import Row from "./Row";
import { useAppState } from "@/context/AppProvider";
import useReportsListener from "@/firebase/reportsListener";
import Link from "next/link";

function Text() {
  const [{ report, reports }, dispatch] = useAppState();
  const [reportSet, setReportSet] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useReportsListener();

  const saveReport = () => {
    let id = Date.now().toString();
    // writeReport(report)
  };

  const removeItem = (name, id) => {
    let arr = report[name];
    let newArr = arr.filter((item) => item.id !== id);
    let obj = { ...report, [name]: newArr };
    dispatch({ type: "SET-OBJ", name: "report", load: obj });
  };

  const selectReport = (e) => {
    let obj = reports.find((r) => r.id === e.target.value);
    dispatch({ type: "SET-OBJ", name: "report", load: obj });
    setReportSet(true);
  };

  const styles = {
    main: `w-[70%] rounded p-[4%] m-[4%] text-black bg-white flex`,
    title: `text-xl font-bold`,
    spacer: `w-full border-b-2 border-black my-2`,
    filterCont: `w-full h-full flex flex-col items-center`,
    reportCont: `w-full flex flex-col items-center justify-start`,
    button: `text-xl font-semibold px-1 rounded hover:text-white border-2 border-transparent hover:border-black mx-[4px]`,
  };

  return (
    <div className={styles.main}>
      <div className={styles.filterCont}>
        <button className={`${styles.button} text-white bg-blue-500`}>
          Create New Report
        </button>
        <p>OR</p>
        <h1 className={styles.title}>Select a report to begin</h1>
        <div className={styles.spacer} />
        {/* Report title cards sorted alphabetically by name and filtered by title inputs until a report is selected or Create New Report button is clicked */}
        {reports.map((report) => (
          <div key={report.id} className="w-full flex justify-between mt-5">
            <div className="col-3">
              <h5 className="font-bold">{report.name}</h5>
            </div>
            <div className="col-2">
              <p>{report.commodity}</p>
            </div>
            <div className="col-2">
              <p>{report.year}</p>
            </div>
            <div className="col-2">
              <p>${report.total.toFixed(2)}</p>
            </div>
            <div className="col-3">
              {/* <button
                value={report.id}
                className={`${styles.button} bg-blue-500`}
                onClick={(e) => selectReport(e)}
              >
                Select
              </button> */}
              <Link
                className={`${styles.button} bg-blue-500`}
                href={{ pathname: "/reports/[id]", query: { id: report.id } }}
              >
                {" "}
                Select{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Container = `
    width: 60%;

    h4, h5 {
        text-align: center;
        padding: 5px;
    }
    @media print {
        width: 100%;
        margin-left: 70px;
    }
`;

const Header = `
  text-align: center;
`;
const Buttons = `
    display: flex;
    width: 100%;
    justify-content: space-around;
    @media print {
        display: none;
    }
`;
const Total = `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 150px;

    p {
        font-size: 20px;
    }
`;

export default Text;
