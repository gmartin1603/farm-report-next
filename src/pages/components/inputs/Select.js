import React from "react";
import { useRouter } from "next/router";

const Select = ({ data, handleChange, value, name }) => {
  const router = useRouter();
  const styles = {
    main: `w-full text-black font-bold rounded p-1`,
    label: `text-white`,
    select: `w-full`,
    option: ``,
  };
  if (!router.isFallback && !data) {
    return <h1>Page Not Found</h1>;
  }

  return (
    <div className={styles.main}>
      {/* <h3 className={styles.label}> {data.label} </h3> */}
      <select
        id={data.id}
        name={name}
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
