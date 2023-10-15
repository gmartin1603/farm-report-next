import React, { useEffect, useState } from "react";
import { useAppState } from "@/context/AppProvider";
import useReportsListener from "@/firebase/reportsListener";
import Link from "next/link";
import dynamic from "next/dynamic";
import commonServices from "../api/common";
import commonAPI from "../api/common";
import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import useCollectionListener from "@/firebase/collectionListener";
import useDocListener from "@/firebase/docListener";

function NoSSRReportSelect() {
  const [{ profile, names, commodities, report, reports, years }, dispatch] = useAppState();
  const [filter, setFilter] = useState({ name: "", commodity: "", year: "" });
  const [filtered, setFiltered] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [newName, setNewName] = useState(false);
  const [newNameValue, setNewNameValue] = useState("");
  const [newNameError, setNewNameError] = useState(false);
  
  const [newCommodity, setNewCommodity] = useState(false);
  const [newCommodityValue, setNewCommodityValue] = useState("");
  const [newCommodityError, setNewCommodityError] = useState(false);
  // const [newYear, setNewYear] = useState("");

  useReportsListener();
  useDocListener("names")
  useDocListener("commodities")

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

  const handleAddNew = (e) => {
    let newFilter = structuredClone(filter);
    const { id, value } = e.target;
    if (id === "name") {
      setNewNameValue(value);
    } else if (id === "commodity") {
      setNewCommodityValue(value);
    }
    newFilter[id] = value;
    setFilter(newFilter);
  };

  const handleFilterChange = (e) => {
    let newFilter = structuredClone(filter);
    const { name, value } = e.target;
    if (value === "Add New") {
      console.log("add new");
      console.log(name)
      if (name === "name") {
        setNewName(true);
      } else if (name === "commodity") {
        setNewCommodity(true);
      }
      newFilter[name] = "";
    } else {
      newFilter[name] = value;
    }
    setFilter(newFilter);
  };

  useEffect(() => {
    let exists = false;
    console.log("newNameValue", newNameValue);
    names.forEach((name) => {
      if (name.toLowerCase() === newNameValue.toLowerCase()) {
        exists = true;
      }
    });
    setNewNameError(exists);
  }, [newNameValue]);

  const submitSave = (e) => {
    console.log("submit save");
    let load = {
      user: profile.uid,
      coll: e.target.name,
      data: [...names, newNameValue],
    };
    if (e.target.name === "commodities") {
      load.data = [...commodities, newCommodityValue];
    }

    commonAPI("writeData", load)
      .then((res) => {
        console.log(res);
        if (e.target.name === "names") {
          setNewName(false);
          setFilter((prev) => ({ ...prev, name: newNameValue }));
        } else if (e.target.name === "commodities") {
          setNewCommodity(false);
          setFilter((prev) => ({ ...prev, commodity: newCommodityValue }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createReport = (e) => {
    setDisabled(true);
    console.log("create report", filter);
    let report = {
      id: `${filter.name}-${filter.commodity}-${filter.year}`,
      name: filter.name,
      commodity: filter.commodity,
      year: filter.year,
      total: 0,
    };

    let load = {
      coll: profile.uid,
      data: report,
    };

    commonAPI("createReport", load)
      .then((res) => {
        console.log(res);
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
          {newName ? (
            
            <FormGroup sx={{ m: 1, minWidth: 150 }} row>
              <TextField 
              data-cy="report-name-input"
              id="name" 
              label="New Name" 
              variant="filled" 
              value={newNameValue}
              onChange={handleAddNew}
              error={newNameError}
              helperText={newNameError ? "Name already exists" : ""}
              />
              <Button 
              data-cy="report-name-save-btn"
              name="names"
              variant="contained"
              onClick={submitSave}
              >Save</Button>

            </FormGroup>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="name-select-label">Name</InputLabel>
            <Select
              data-cy="report-name-select"
              labelId="name-select-label"
              id="name-select"
              name="name"
              value={filter.name}
              label="Name"
              formhelpertext="Error"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[...names, "Add New"].map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            )}
          {newCommodity ? (
            <FormGroup sx={{ m: 1, minWidth: 150 }} row>
              <TextField
              data-cy="report-commodity-input"
              id="commodity"
              label="New Commodity"
              variant="filled"
              value={newCommodityValue}
              onChange={handleAddNew}
              error={newCommodityError}
              helperText={newCommodityError ? "Commodity already exists" : ""}
              />
              <Button
              data-cy="report-commodity-save-btn"
              name="commodities"
              variant="contained"
              onClick={submitSave}
              >Save</Button>
            </FormGroup>
          ) : (
            <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="commodity-select-label">Commodity</InputLabel>
            <Select
              data-cy="report-commodity-select"
              labelId="commodity-select-label"
              id="commodity-select"
              name="commodity"
              value={filter.commodity}
              label="Commodity"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {[...commodities, "Add New"].map((commodity) => (
                <MenuItem key={commodity} value={commodity}>
                  {commodity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            )}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              data-cy="report-year-select"
              labelId="year-select-label"
              id="year-select"
              name="year"
              value={filter.year}
              label="Year"
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            data-cy="create-report-btn"
            variant="contained"
            onClick={(e) => createReport(e)}
            disabled={disabled}
          >
            Create New Report
          </Button>
        </div>
        <div className={styles.spacer} />
        {/* Report title cards sorted alphabetically by name and filtered by title inputs until a report is selected or Create New Report button is clicked */}
        {filtered.map((report) => { return (
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
                href={`/reports/${report.id}`}
              >
                {" "}
                Select{" "}
              </Link>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}

// export it with SSR disabled
const ReportSelect = dynamic(() => Promise.resolve(NoSSRReportSelect), {
  ssr: false,
});

export default ReportSelect;
