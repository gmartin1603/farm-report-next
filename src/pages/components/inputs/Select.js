import React from "react";
// import dynamic from "next/dynamic";

const Select = ({ id, options, label, handleChange, value, name }) => {
  const styles = {
    main: `w-full text-black font-bold rounded p-1`,
    label: `text-white`,
    select: `w-full text-center max-w-[140px] border border-black rounded`,
    option: ``,
  };

  return (
    <div className={styles.main}>
      {/* <h3 className={styles.label}> {label} </h3> */}
      <select
        id={id}
        name={name}
        className={styles.select}
        onChange={(e) => handleChange(e)}
        value={value ? value : label}
      >
        <option className={styles.option} hidden>
          {label}
        </option>
        {options &&
          options.map((option, i) => (
            <option key={i} className={styles.option}>
              {" "}
              {option.label || option}{" "}
            </option>
          ))}
      </select>
    </div>
  );
};

// export it with SSR disabled
// const Select = dynamic(() => Promise.resolve(NoSSRSelect), {
//   ssr: false,
// });

export default Select;
