export const initialState = {
  user: "",
  profile: {
    dName: "User",
    email: "",
    names: ["Fred", "Bob", "Joe"],
    commodities: ["Corn", "Soy Beans"],
  },
  years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
  optionList: [],
  expenses: [],
  reports: [],
};

const appReducer = (state, action) => {
  // console.log(action, state)
  // console.log(action);
  switch (action.type) {
    case "ADD-ROW":
      // console.log(action);
      let arr = structuredClone(state.report[action.name]);
      arr.push(action.load);
      let obj = { ...state.report, [action.name]: arr };
      return {
        ...state,
        report: obj,
      };
    case "SET":
      // console.log(action);
      return {
        ...state,
        [action.name]: action.load,
      };
    case "UPDATE":
      // console.log(action);
      return {
        ...state,
        [action.name]: action.load,
      };

    case "RESET":
      return {
        ...state,
        landLord: "",
        crop: "",
        year: "",
        seedList: [],
        chemList: [],
        fertList: [],
        truckingList: [],
        fuelList: [],
        insList: [],
        misc: [],
      };
    default:
      console.log("No State Change", action.name);
      return state;
  }
};

export default appReducer;
