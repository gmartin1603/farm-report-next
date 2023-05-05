import React from "react";

const SignInMethod = ({}) => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    switch (e.target.id) {
      case "newUser":
        setAuthMethod(true);
        break;
      default:
        console.log("default");
    }
  };
  const styles = {
    main: ``,
  };

  return (
    <div className={styles.main}>
      <button
        className={styles.button}
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Email
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Google
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={(e) => handleClick(e)}
      >
        Annonomous
      </button>
    </div>
  );
};

export default SignInMethod;
