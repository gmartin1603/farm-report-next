import React from "react"
import { useAppState } from "../../context/AppProvider"
import Select from "./inputs/Select"

const SideBar = ({}) => {

    const [{names, commodities, years}, dispatch] = useAppState()



    const styles = {
        main:`h-[100vh] w-[20%] flex flex-col items-center justify-start`,
    }

  return (
    <div className={styles.main}>
      <h3>Title Inputs</h3>
      <Select
      data={{label: "Land Lord", options: names}}
      />
      <Select
      data={{label: "Crop", options: commodities}}
      />
      <Select
      data={{label: "Year", options: years}}
      />
    </div>
  )
}

export default SideBar
