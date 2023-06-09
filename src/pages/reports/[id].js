import { useAppState } from "@/context/AppProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useCollectionListener from "@/firebase/collectionListener";
import { getReport } from "@/firebase/firestore";
import Row from "../components/Row";

const Id = ({}) => {
  const [disabled, setDisabled] = useState(false);
  const [reportTemplate, setReportTemplate] = useState({});
  const [report, setReport] = useState({});

  const [{ reports, user, expenses }, dispatch] = useAppState();

  let url = "https://us-central1-farm-report-86ac2.cloudfunctions.net/saveReport";
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:5001/farm-report-86ac2/us-central1/saveReport";
  }

  useCollectionListener("expenses");

  const router = useRouter();

  const { Id } = router.query;

  useEffect(() => {
    if (user && Id) {
      getReport(user, Id)
        .then((res) => {
          console.log(res);
          // Keep track of changes
          setReport(res);
          // Control object
          setReportTemplate(res);
        })
        .catch((err) => console.log(err));
    }
  }, [Id, user]);

  const removeItem = (name, id) => {
    let arr = report[name];
    let newArr = arr.filter((item) => item.id !== id);
    let obj = { ...report, [name]: newArr };
    setReport(obj);
  };

  const addItem = (name, obj) => {
    let arr = report[name] || [];
    arr.push(obj);
    let newObj = { ...report, [name]: arr };
    setReport(newObj);
  };

  const handleSave = async () => {
    console.log(report);
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ report: report, coll: user }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
        if (data.status === "success") {
          // router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const buildCategories = () => {
    let arr = [];
    expenses.map((expense) => {
      arr.push({
        id: expense.id,
        name: expense.label,
        arr: report[expense.id] || [],
      });
    });
    return arr;
  };

  const styles = {
    main: `w-full flex flex-col items-center justify-start`,
    title: `text-2xl font-bold`,
    titleCont: `w-full pb-2 mb-5 border-b-4 border-black`,
    spacer: `w-full border-b-2 border-black my-2`,
    filterCont: `w-full h-full flex flex-col items-center`,
    reportCont: `w-full max-w-[1000px] rounded p-[4%] m-[4%] text-black bg-white flex flex flex-col items-between justify-start`,
    button: `text-xl font-semibold px-1 rounded hover:text-white border-2 border-transparent hover:border-black mx-[4px]`,
    btnCont: `w-full flex justify-center mt-10 print:hidden`,
    totalCont: `w-full flex justify-between items-center`,
  };

  // if (!router.isFallback && !Id) {
  //   return <h1>Page Not Found</h1>;
  // }

  return (
    <div className={styles.main}>
      <div className={styles.reportCont}>
        <div className={styles.titleCont}>
          <h2 className={styles.title}>
            {report.name} {report.commodity} {report.year}
          </h2>
        </div>
        {buildCategories().map((cat) => {
          return (
            <div key={cat.id}>
              <Row
                id={cat.id}
                head={cat.name}
                arr={cat.arr}
                removeItem={removeItem}
                addItem={addItem}
              />
            </div>
          );
        })}
        <div className={styles.totalCont}>
          <div className="col-3">
            <h5 className="font-bold">Total Billed</h5>
          </div>
          <div className="col-2">
            <p>${report.id && report.total.toFixed(2)}</p>
          </div>
        </div>
        <div className={styles.btnCont}>
          <button
            disabled={disabled}
            className={`${styles.button} bg-green-500`}
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className={`${styles.button} bg-blue-500`}
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Id;
