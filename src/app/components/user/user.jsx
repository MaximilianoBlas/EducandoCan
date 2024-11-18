import { getUser } from "@/app/Redux/action/user";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./user.module.css";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

export default function User(prop) {
  const [userInput, setUserInput] = useState("");
  const [value, setValue] = useState("");
  const [stateTimeOut, setStateTimeOut] = useState();
  const [closeEye, setCloseEye] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!closeEye) setUserInput(value);
    else setUserInput("*".repeat(value.length));
  }, [closeEye]);

  const inputChange = (e) => {
    if (stateTimeOut) clearTimeout(stateTimeOut);
    if (!closeEye) setCloseEye(true);

    let newValue = e.target.value;

    if (
      e.nativeEvent.inputType === "insertText" ||
      e.nativeEvent.inputType === "insertCompositionText"
    ) {
      if (value.length === 0) {
        setValue(newValue);
        setUserInput(newValue);

        setStateTimeOut(
          setTimeout(() => {
            setUserInput("*".repeat(newValue.length));
          }, 500)
        );
      } else if (value.length > 0) {
        {
          setValue(value + newValue.slice(-1));
        }
        setUserInput("*".repeat(newValue.length - 1) + newValue.slice(-1));

        setStateTimeOut(
          setTimeout(() => {
            setUserInput("*".repeat(newValue.length));
          }, 500)
        );
      }
    } else if (e.nativeEvent.inputType === "deleteContentBackward") {
      let subtraction = value.length - newValue.length;

      if (!newValue) setValue("");
      else setValue(value.slice(0, -subtraction));

      setUserInput("*".repeat(newValue.length));
    }
  };

  return (
    <div className={style.main}>
      <h2>Acceso</h2>
      <div className={style.formContainer}>
        <div className={style.inputContainer}>
          <label htmlFor="user">Password: </label>
          <input
            className={style.user}
            value={userInput}
            onChange={inputChange}
            type="text"
            name="user"
            autoFocus
          />
          {closeEye && (
            <button
              className={style.iconCloseEye}
              onClick={() => setCloseEye(false)}
            >
              <FaEyeSlash />
            </button>
          )}

          {!closeEye && (
            <button
              className={style.iconOpenEye}
              onClick={() => setCloseEye(true)}
            >
              <IoEyeSharp />
            </button>
          )}
        </div>

        <div className={style.incorrectPContainer}>
          {prop.incorrect && (
            <p className={style.incorrectP}> Contraseña incorrecta</p>
          )}
        </div>
      </div>
      <button
        className={style.button}
        onClick={() => {
          dispatch(getUser(value));
        }}
      >
        Enviar
      </button>
    </div>
  );
}
