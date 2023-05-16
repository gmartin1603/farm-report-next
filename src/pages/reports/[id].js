import { useAppState } from "@/context/AppProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Row from "../components/Row";

const id = ({}) => {
  const [disabled, setDisabled] = useState(false);

  const [{ report, reports }, dispatch] = useAppState();

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      let arr = reports.filter((item) => item.id === id);
      if (arr.length > 0) {
        dispatch({ type: "SET-OBJ", name: "report", load: arr[0] });
      }
    }
  }, [id]);

  const removeItem = (name, id) => {
    let arr = report[name];
    let newArr = arr.filter((item) => item.id !== id);
    let obj = { ...report, [name]: newArr };
    dispatch({ type: "SET-OBJ", name: "report", load: obj });
  };

  const styles = {
    main: `w-full rounded p-[4%] m-[4%] shadow-inner shadow-blue-[500] text-black bg-white flex`,
    title: `text-xl font-bold`,
    spacer: `w-full border-b-2 border-black my-2`,
    filterCont: `w-full h-full flex flex-col items-center`,
    reportCont: `w-full flex flex-col items-between justify-start`,
    button: `text-xl font-semibold px-1 rounded hover:text-white border-2 border-transparent hover:border-black mx-[4px]`,
  };

  return (
    <div className={styles.main}>
      <div className={styles.reportCont}>
        <div>
          <h2 className={styles.title}>
            {report.name} {report.commodity} {report.year}
          </h2>
        </div>
        {Object.keys(report).map((key) => {
          if (typeof report[key] !== "object") {
            return null;
          }
          let arr = report[key];
          return (
            <div key={key}>
              {arr && arr.length > 0 && (
                <Row head={key} arr={key} removeItem={removeItem} />
              )}
            </div>
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
    </div>
  );
};

export default id;
