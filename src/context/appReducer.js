export const initialState = {
  profile: {
    dName: "User",
    email: "",
  },
  names: ["Fred", "Bob", "Joe"],
  commodities: ["Corn", "Soy Beans"],
  years: [],
  optionList: [],
  expenses: [
    {
      label: "Seed",
      id: "seedList",
      options: [
        // {label:"pioneer0", price:100, unit:"Bag"},
        // {label:"pioneer1", price:200, unit:"Bag"},
        // {label:"pioneer2", price:300, unit:"Bag"},
        // {label:"pioneer3", price:400, unit:"Bag"},
        // {label:"pioneer4", price:500, unit:"Bag"},
        // {label:"pioneer5", price:600, unit:"Bag"},
      ],
      units: ["Bag"],
    },
    {
      label: "Chemical",
      id: "chemList",
      options: ["roundup"],
      units: ["Lb", "Gal"],
    },
    {
      label: "Fertilizer",
      id: "fertList",
      options: ["Manure", "0-0-50"],
      units: ["LB", "Gal", "Ton"],
    },
    { label: "Fuel", id: "fuelList", options: ["Diesel"], units: ["Gal"] },
    {
      label: "Trucking",
      id: "truckingList",
      options: ["Corn", "Soy Beans"],
      units: ["Bu"],
    },
    {
      label: "Crop Insurance",
      id: "insList",
      options: ["Corn", "Soy Beans"],
      units: ["Acre"],
    },
  ],
  reports: [],
  report: {
    name: "",
    commodity: "",
    year: "",
    seedList: [],
    chemList: [],
    fertList: [],
    truckingList: [],
    fuelList: [],
    insList: [],
    misc: [],
    total: 0,
  },
};

// export const textObj = {
//     landLord: newState.landLord,
//     year: newState.year,
//     crop: newState.crop,
//     seedList: newState.seedList,
//     chemList: newState.chemList,
//     fertList: newState.fertList,
//     fuelList: newState.fuelList,
//     truckingList: newState.truckingList,
// }

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
    case "ADD-STR":
      // console.log(action);
      return {
        ...state,
        [action.name]: action.load,
      };
    case "SET-OBJ":
      // console.log(action);
      return {
        ...state,
        [action.name]: action.load,
      };
    case "ADD-ARR":
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
      console.log("No Form State Change");
      return state;
  }
};

export default appReducer;
