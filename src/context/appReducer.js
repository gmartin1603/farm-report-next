export const initialState = {
    names: [],
    commodities: [],
    years: [],
    optionList: [],
    expenses: [
        // {label: "Seed", id: "seedList", options: ["pioneer"], units: ["Bag"]},
        // {label: "Chemical", id: "chemList", options: ["roundup"], units: ["Lb", "Gal"]},
        // {label: "Fertilizer", id: "fertList", options: ["Manure", "0-0-50"], units: ["LB", "Gal", "Ton"]},
        // {label: "Fuel", id: "fuelList", options: ["Diesel"], units: ["Gal"]},
        // {label: "Trucking", id: "truckingList", options: ["Corn", "Soy Beans"], units: ["Bu"]},
        // {label: "Crop Insurance", id: "insList", options: ["Corn", "Soy Beans"], units: ["Acre"]},
    ],
    report:{
        name: "Name",
        commodity: "Crop",
        year: 2000,
        body:{
            seedList: [],
            chemList: [],
            fertList: [],
            truckingList: [],
            fuelList: [],
            insList: [],
            misc: [],
        },
        total: 0,
    },
}

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
    // console.log(action)
    switch(action.type) {

        case "ADD-STRING":
            console.log(action)
            return (
                {
                    ...state,
                    [action.name]: action.load
                }
            )
        case "ADD-OBJ":
            console.log(action)
            let arr = state[action.name]
            arr.push(action.load)
            return (
                {
                    ...state,
                    [action.name]: arr
                }
            )
        case "ADD-ARR":
            return (
                {
                    ...state,
                    [action.name]: action.load,
                }
            )
        case "UPDATE":
            console.log(action)
            return (
                {
                    ...state,
                    [action.name]: action.load,
                }
            )

        case "RESET":
            return (
                { ...state,
                    landLord: "",
                    crop: "",
                    year: "",
                    seedList: [],
                    chemList: [],
                    fertList: [],
                    truckingList: [],
                    fuelList: [],
                    insList: [],
                    misc: [],}
            )
        default:
            console.log("No Form State Change")
            return state;
    }

}

export default appReducer