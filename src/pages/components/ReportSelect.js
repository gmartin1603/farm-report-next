import React, { useEffect, useState } from "react";
import { useAppState } from "@/context/AppProvider";
import useReportsListener from "@/firebase/reportsListener";
import Link from "next/link";
import dynamic from "next/dynamic";
import Select from "./inputs/Select";

function NoSSRReportSelect() {
  const [{ profile, report, reports, years }, dispatch] = useAppState();
  const [filter, setFilter] = useState({ name: "", commodity: "", year: "" });
  const [filtered, setFiltered] = useState([]);
  const [disabled, setDisabled] = useState(false);

  let url = "http://localhost:5001/farm-report-86ac2/us-central1/saveReport";

  useReportsListener();

  useEffect(() => {
    if (
      filtered.length === 0 &&
      !filter.name &&
      !filter.commodity &&
      !filter.year
    ) {
      setFiltered(reports);
    }
  }, [reports]);

  useEffect(() => {
    let newFiltered = reports.filter((report) => {
      if (filter.name && filter.name !== report.name) {
        return false;
      }
      if (filter.commodity && filter.commodity !== report.commodity) {
        return false;
      }
      if (filter.year && filter.year !== report.year) {
        return false;
      }
      return true;
    });

    setFiltered(newFiltered);
  }, [filter, reports]);

  useEffect(() => {
    if (filter.name && filter.commodity && filter.year) {
      if (filtered.length === 0) {
        setDisabled(false);
      }
    } else {
      setDisabled(true);
    }
  }, [filter, filtered]);

  const handleFilterChange = (e) => {
    let newFilter = structuredClone(filter);
    const { id, value } = e.target;
    if (value === "Add New") {
      console.log("add new");
      newFilter[id] = "";
    } else {
      newFilter[id] = value;
    }
    setFilter(newFilter);
  };

  const createReport = (e) => {
    setDisabled(true);
    console.log("create report", filter);
    let report = {
      id: `${filter.name} ${filter.commodity} ${filter.year}`,
      name: filter.name,
      commodity: filter.commodity,
      year: filter.year,
      total: 0,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ coll: profile.uid, report: report }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => {
        console.log(err);
        setDisabled(false);
      });
  };

  const styles = {
    main: `w-[70%] rounded p-[4%] m-[4%] text-black bg-white flex`,
    title: `text-xl font-bold mb-10 underline underline-offset-2`,
    spacer: `w-full border-b-2 border-black my-2`,
    container: `w-full h-full flex flex-col items-center`,
    filterCont: `w-full flex items-end justify-around`,
    reportCont: `w-full flex items-center justify-start`,
    button: `w-full font-semibold py-1 rounded hover:text-white border-2 border-transparent hover:border-black`,
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Select or create a report to begin</h1>
        <div className={styles.filterCont}>
          <Select
            name="name"
            label="Name"
            value={filter.name}
            options={profile.names}
            data={{
              id: "name",
              label: "Name",
              options: [...profile.names, "Add New"],
            }}
            handleChange={handleFilterChange}
          />
          <Select
            name="commodity"
            label="Commodity"
            value={filter.commodity}
            options={profile.commodities}
            data={{
              id: "commodity",
              label: "Commodity",
              options: [...profile.commodities, "Add New"],
            }}
            handleChange={handleFilterChange}
          />
          <Select
            name="year"
            label="Year"
            value={filter.year}
            options={profile.years}
            data={{
              id: "year",
              label: "Year",
              options: [...years, "Add New"],
            }}
            handleChange={handleFilterChange}
          />
          <button
            className={`${styles.button} text-white bg-blue-500 disabled:bg-gray-500 disabled:text-gray-400 disabled:cursor-not-allowed`}
            onClick={(e) => createReport(e)}
            disabled={disabled}
          >
            Create New Report
          </button>
        </div>
        <div className={styles.spacer} />
        {/* Report title cards sorted alphabetically by name and filtered by title inputs until a report is selected or Create New Report button is clicked */}
        {filtered.map((report) => (
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
              <Link
                className={`${styles.button} px-2 text-lg bg-blue-500`}
                href={{ pathname: "/reports/[Id]", query: { Id: report.id } }}
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

// export it with SSR disabled
const ReportSelect = dynamic(() => Promise.resolve(NoSSRReportSelect), {
  ssr: false,
});

export default ReportSelect;
