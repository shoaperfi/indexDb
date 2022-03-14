import React, { useState } from "react";
import "./MyForm.css";
import ValidatorFn from "./ValidateFunction";
import { useIndexedDB } from "react-indexed-db";

const API_URL = "https://api.datamuse.com/words?ml=";

export default function MyForm() {
  const [inputs, setInputs] = useState({ userName: "", dob: "", address: "" });
  const [errors, setErrors] = useState({});
  const [words, setWords] = useState([]);
  const { add } = useIndexedDB("Appify_users");

  const handleChange = (event) => {
    //setErrors({});
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    if (name === "userName") {
      setWords([]);
      if (value.length > 2) {
        getMatchingWords(value);
      }
    }
  };

  const getMatchingWords = (inputText) => {
    fetch(`${API_URL}${inputText}`)
      .then((response) => response.json())
      .then((data) => {
        let wordsFromApi = data.splice(0, 10);
        setWords(wordsFromApi.map((item) => item.word));
      })
      .catch((err) => console.log(err.message));
  };

  const handleClickMatchingWord = (matchingWord) => {
    setInputs({ ...inputs, userName: matchingWord });
    setWords([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let err = ValidatorFn(inputs);
    setErrors(err);
    if (!Object.keys(err).length > 0) {
      add({
        name: inputs.userName,
        dob: inputs.dob,
        address: inputs.address
      }).then(
        (event) => {
          console.log("Data added: ", event);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  return (
    <div className="accountScreen">
      <div className="row d-flex justify-content-center">
        <h3>Create Account</h3>
      </div>
      <form className="formArea" onSubmit={handleSubmit}>
        <div className="row inputRow">
          <div className="col-lg-2">
            <label>Name</label>
          </div>
          <div className="col-lg-4">
            <input
              autoComplete="off"
              onChange={handleChange}
              className="inputStyle"
              type="text"
              name="userName"
              value={inputs.userName}
              //onBlur={() => setNameBlur(1)}
            />
            {words &&
              words.map((word, idx) => (
                <div
                  key={idx}
                  className="words col-md-12 justify-content-md-center"
                  onClick={() => handleClickMatchingWord(word)}
                >
                  {word}
                </div>
              ))}
            <span className="text-danger">{errors.userName}</span>
          </div>
        </div>
        <div className="row inputRow">
          <div className="col-lg-2">
            <label>DOB</label>
          </div>
          <div className="col-lg-4">
            <input
              onChange={handleChange}
              className="inputStyle"
              name="dob"
              type="date"
              value={inputs.dob}
            />
            <span className="text-danger">{errors.dob}</span>
          </div>
        </div>
        <div className="row inputRow">
          <div className="col-lg-2">
            <label>Address</label>
          </div>
          <div className="col-lg-4">
            <textarea
              onChange={handleChange}
              className="textareaStyle"
              name="address"
              value={inputs.address}
            />
            <span className="text-danger">{errors.address}</span>
          </div>
        </div>
        <div className="row inputRow">
          <button
            className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 btn btn-success"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
