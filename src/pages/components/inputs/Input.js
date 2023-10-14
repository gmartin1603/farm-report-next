import React from "react";

const Input = (props) => {
  const styles = {
    main: `w-full flex ${
      props.row ? "items-center" : "flex-col items-start"
    } justify-start`,
    input: `text-black border border-black rounded ${
      props.row ? "text-center max-w-[65px]" : "w-full font-bold"
    }`,
    label: `w-max text-black font-bold mx-2`,
  };

  return (
    <div data-cy={props.dataCy} className={styles.main}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className={styles.input}
        onChange={(e) => props.handleChange(e)}
        value={props.value}
      />
    </div>
  );
};

export default Input;
