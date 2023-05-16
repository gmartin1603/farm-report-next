import React, { useEffect, useState } from "react";
import { createUser, signInWithGoogle, signin } from "../../firebase/auth";
import Input from "./inputs/Input";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import PhoneIcon from "@mui/icons-material/Phone";
import AppleIcon from "@mui/icons-material/Apple";
import Image from "next/image";
import GoogleLogo from "../../assets/Google Logo.png";

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

  const login = (e) => {
    e.preventDefault();
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
    // console.log([profile, email, password, password2]);
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
    button: `flex justify-center items-center text-white text-center font-semibold mt-2 py-2 px-4 rounded`,
    active: `bg-green-500 shadow-green-200 shadow-inner hover:bg-green-400 hover:border-green-700 border border-green-700`,
    provider: `bg-gray-500 shadow-gray-200 shadow-inner hover:bg-gray-400 hover:border-gray-500 border border-gray-700`,
    disabled: `bg-gray-500 text-white font-bold mt-2 py-2 px-4 rounded cursor-none`,
    btnLable: `ml-2 w-full text-center`,
    link: `mt-[4px] hover:underline hover:text-black font-semibold cursor-pointer`,
  };

  return (
    <div className={styles.main}>
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
              className={`${styles.button} ${styles.provider}`}
              onClick={(e) => handleClick(e)}
            >
              <Image
                src={GoogleLogo}
                alt="Google Logo"
                width={30}
                height={30}
                className="mr-5 cursor-none"
              />{" "}
              Google Account Login
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
          {/* <p className={styles.btnLable} id="pTag"> */}
          Sign Up
          {/* </p> */}
        </button>
        {authMethod && (
          <>
            <button
              id="google"
              className={`${styles.button} ${styles.provider}`}
              onClick={(e) => handleClick(e)}
            >
              <Image
                src={GoogleLogo}
                alt="Google Logo"
                width={30}
                height={30}
                className="mr-5 cursor-none"
              />{" "}
              Google Sign Up
            </button>
            <p
              className={styles.link}
              id="login"
              onClick={(e) => handleClick(e)}
            >
              Already have an account? Click Here
            </p>
          </>
        )}
      </form>
    </div>
  );
}

export default Login;
