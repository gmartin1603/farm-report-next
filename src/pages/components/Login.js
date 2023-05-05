import React, { useEffect, useState } from "react";
import { createUser, signInWithGoogle, signin } from "../../firebase/auth";
import Input from "./inputs/Input";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import AppleIcon from "@mui/icons-material/Apple";

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
    // console.log(e.target.id);
    switch (e.target.id) {
      case "newUser":
        setAuthMethod(true);
        break;
      case "login":
        setAuthMethod(false);
        break;
      case "google":
        console.log("google");
        signInWithGoogle();
        break;
      case "apple":
        console.log("apple");
        break;
      case "submit":
        authMethod ? create() : login();
        break;
      default:
        console.log("e.target.id: ", e.target.id);
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
    button: `flex justify-between items-center text-white font-semibold mt-2 py-2 px-4 rounded`,
    active: `bg-green-500 hover:bg-green-700 hover:border-green-500 border border-green-700`,
    disabled: `bg-gray-500 text-white font-bold mt-2 py-2 px-4 rounded cursor-none`,
    btnLable: `ml-2 w-full text-center`,
    link: `mt-[4px] hover:underline hover:text-black font-semibold cursor-pointer`,
  };
  const devBool = true;
  return (
    <div className={styles.main}>
      {devBool ? (
        <form className={styles.form} action="login">
          <button
            id="login"
            className={`${styles.button} ${styles.active}`}
            onClick={(e) => handleClick(e)}
          >
            <EmailIcon fontSize="small" />
            <p className={styles.btnLable}>Email</p>
          </button>
          <button
            id="google"
            className={`${styles.button} ${styles.active}`}
            onClick={(e) => handleClick(e)}
          >
            <GoogleIcon fontSize="small" />{" "}
            <p className={styles.btnLable}>Google</p>
          </button>
          <button
            id="apple"
            className={`${styles.button} ${styles.active}`}
            onClick={(e) => handleClick(e)}
          >
            <AppleIcon fontSize="small" />{" "}
            <p className={styles.btnLable}>Apple</p>
          </button>
          <button
            id="phone"
            className={`${styles.button}  ${styles.active}`}
            onClick={(e) => handleClick(e)}
          >
            <PhoneIcon fontSize="small" />{" "}
            <p className={styles.btnLable}>Phone</p>
          </button>
        </form>
      ) : (
        <form className={styles.form} action="login-password">
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
            <>
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
              <button
                id="google"
                className={`${styles.button} ${styles.active}`}
                onClick={(e) => handleClick(e)}
              >
                <GoogleIcon fontSize="small" id="icon" />{" "}
                <p className={styles.btnLable} id="pTag">
                  Google
                </p>
              </button>
            </>
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
            <p
              className={styles.link}
              id="login"
              onClick={(e) => handleClick(e)}
            >
              Already have an account? Click Here
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Login;
