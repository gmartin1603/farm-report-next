import React from "react";

const Select = ({ data, handleChange, value }) => {
  const styles = {
    main: `w-full text-black font-bold rounded p-1`,
    label: `text-white`,
    select: `w-full`,
    option: ``,
  };

  return (
    <div className={styles.main}>
      {/* <h3 className={styles.label}> {data.label} </h3> */}
      <select
        id={data.id}
        className={styles.select}
        onChange={(e) => handleChange(e)}
        value={value ? value : data.label}
      >
        <option className={styles.option} hidden>
          {data.label}
        </option>
        {data?.options.map((option, i) => (
          <option key={i} className={styles.option}>
            {" "}
            {option.label || option}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
