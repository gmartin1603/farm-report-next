import React, { useEffect, useState } from "react";
import { createUser, signin } from "../../firebase/auth";
import Input from "./inputs/Input";

function Login(props) {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [authMethod, setAuthMethod] = useState(false);
  const [profile, setProfile] = useState({
    dName: "",
    names: [],
    commodities: [],
    start: 2000,
  });

  const login = () => {
    signin(email, password);
  };

  const create = async () => {
    console.log("create user");
    await createUser(email, password, profile);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    switch (e.target.id) {
      case "newUser":
        setAuthMethod(true);
        break;
      case "login":
        setAuthMethod(false);
        break;
      case "submit":
        authMethod ? create() : login();
        break;
      default:
        console.log("default");
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.type)
    switch (e.target.id) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setPassword2(e.target.value);
        break;
      default:
        setProfile((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  // validate
  useEffect(() => {
    console.log([profile, email, password, password2]);
    let valid = false;
    if (authMethod) {
      if (
        profile.dName.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        password2.length > 0
      ) {
        if (password === password2) {
          valid = true;
        }
      }
    } else {
      if (email.length > 0 && password.length > 0) {
        valid = true;
      }
    }
    setDisabled(!valid);
  }, [email, password, password2, profile, authMethod]);

  const styles = {
    main: `flex justify-center items-start h-[100vh]`,
    form: `bg-blue-600 mt-20 flex flex-col border border-black rounded p-5`,
    button: `text-white font-bold mt-2 py-2 px-4 rounded`,
    active: `bg-green-500 hover:bg-green-700`,
    disabled: `bg-gray-500 text-white font-bold mt-2 py-2 px-4 rounded`,
    link: `mt-[4px] hover:underline hover:text-black font-semibold cursor-pointer`,
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} action="login">
        {authMethod && (
          <Input
            type="text"
            id="dName"
            label="Name"
            handleChange={handleChange}
            value={profile.dName}
          />
        )}
        <Input
          type="email"
          id="email"
          label="Email"
          handleChange={handleChange}
          value={email}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          handleChange={handleChange}
          value={password}
        />
        {authMethod ? (
          <>
            <Input
              type="password"
              id="password2"
              label="Confirm Password"
              handleChange={handleChange}
              value={password2}
            />
          </>
        ) : (
          <button
            className={`${styles.button} ${
              disabled ? styles.disabled : styles.active
            }`}
            type="submit"
            onClick={(e) => login(e)}
            disabled={disabled}
          >
            Login
          </button>
        )}
        <button
          id={authMethod ? "submit" : "newUser"}
          className={`${styles.button} ${
            authMethod
              ? disabled
                ? styles.disabled
                : styles.active
              : styles.active
          }`}
          type={authMethod ? "submit" : "button"}
          onClick={(e) => handleClick(e)}
          disabled={authMethod ? disabled : false}
        >
          Sign Up
        </button>
        {authMethod && (
          <p className={styles.link} id="login" onClick={(e) => handleClick(e)}>
            Already have an account? Click Here
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
