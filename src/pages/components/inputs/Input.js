import React from "react"

const Input = (props) => {

    const styles = {
        main:`w-full flex flex-col items-start justify-start`,
        input:`w-full text-black font-bold border border-black rounded p-1`,
    }

  return (
    <div className={styles.main}>
        <label htmlFor={props.id}>{props.label}</label>
        <input
        type={props.type}
        id={props.id}
        className={styles.input}
        onChange={(e) => props.handleChange(e)}
        value={props.value}
        />
    </div>
  )
}

export default Input
