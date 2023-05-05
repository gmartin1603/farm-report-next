import React, { useState } from "react";
// import { writeReport } from '../firebase/firestore';
import Row from "./Row";
import { useAppState } from "@/context/AppProvider";

function Text() {
  const [{ report }, dispatch] = useAppState();
  const [reportSet, setReportSet] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const saveReport = () => {
    let id = Date.now().toString();
    // writeReport(report)
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
      {reportSet ? (
        <div className={styles.reportCont}>
          <div>
            <h2 className={styles.title}>
              {report.name} {report.commodity} {report.year}
            </h2>
          </div>
          {Object.keys(report.body).map((key) => {
            let arr = report.body[key];
            return (
              <>
                {arr && arr.length > 0 && (
                  <Row head={key} arr={arr} removeItem={removeItem} />
                )}
              </>
            );
          })}
          <div className="w-full flex justify-between">
            <div className="col-3">
              <h5 className="font-bold">Total Billed</h5>
            </div>
            <div className="col-2">
              <p>${report.total.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <button
              disabled={disabled}
              className={`${styles.button} bg-green-500`}
              onClick={() => saveReport()}
            >
              Save
            </button>
            <button
              className={`${styles.button} bg-blue-500`}
              onClick={() => window.print()}
            >
              Print
            </button>
            <button
              className={`${styles.button} bg-red-500`}
              onClick={() => clearContext()}
            >
              Clear Sheet
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.filterCont}>
          <button className={`${styles.button} text-white bg-blue-500`}>
            Create New Report
          </button>
          <p>OR</p>
          <h1 className={styles.title}>Select a report to begin</h1>
          {/* Report title cards sorted alphabetically by name and filtered by title inputs until a report is selected or Create New Report button is clicked */}
          <div className={styles.spacer} />
        </div>
      )}
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
