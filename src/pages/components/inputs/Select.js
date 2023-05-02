import React from "react"

const Select = ({data}) => {

    const styles = {
        main:`my-[2%] text-black w-full flex flex-col items-start justify-start`,
        label:`text-white`,
        select:`w-full`,
        option:``,
    }

  return (
    <div className={styles.main}>
        {/* <h3 className={styles.label}> {data.label} </h3> */}
        <select className={styles.select}>
            <option className={styles.option}>{data.label}</option>
            { data?.options.map((option, i) => (
                <option key={i} className={styles.option}> {option} </option>
            ))}
        </select>
    </div>
  )
}

export default Select
