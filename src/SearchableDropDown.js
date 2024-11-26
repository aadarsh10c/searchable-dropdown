import React, { useState, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";

const defaultOptionList = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
  "Option 9",
  "Option 10",
  "Option 11",
  "Option 12",
  "Option 13",
  "Option 14",
  "Option 15",
  "Option 16",
  "Option 17",
  "Option 18",
  "Option 19",
  "Option 20",
];
export default function Searchabledropdown() {
  const [answer, setAnswer] = useState("");
  const [optionList, setOptionList] = useState(defaultOptionList);
  const [filteredList, setFilteredList] = useState(optionList);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const inputRef = useRef(null);

  function handleFilter(val) {
    if (val == "") {
      setFilteredList(optionList);
    } else {
      const lowerCaseValue = val.toLowerCase();
      const newList = optionList.filter((item) => {
        return item.toLowerCase().includes(lowerCaseValue);
      });
      setFilteredList(newList);
    }
  }

  function handleAnswer(e) {
    let value = e.target.value;
    e.preventDefault();
    setAnswer(value);
    handleFilter(value);
  }

  function setDropDownValues(e) {
    e.preventDefault();
    setFilteredList(optionList);
    setDisplayDropdown(true);
  }
  return (
    <div className="search-box">
      <div className="search-box_input">
        <input
          ref={inputRef}
          type="text"
          className="search-box_input-text"
          placeholder="by cotnract name"
          value={answer}
          onFocus={setDropDownValues}
          onBlur={() => setDisplayDropdown(false)}
          onChange={(e) => handleAnswer(e)}
        />
        <span onClick={() => inputRef.current.focus()}>
          <MdArrowDropDown className="search-box_input-icon" />
        </span>
      </div>
      {displayDropdown && (
        <Dropdown setAnswerFn={setAnswer} optionList={filteredList} />
      )}
    </div>
  );
}

function Dropdown({ setAnswerFn, optionList }) {
  function handleOnClick(e, text) {
    e.preventDefault();
    console.log("Clicked");
    setAnswerFn(text);
  }

  function renderOptionList(option) {
    return (
      <li key={option} onClick={(e) => handleOnClick(e, option)}>
        {option}
      </li>
    );
  }

  return (
    <div className="search-box_dropdown">
      <ul>{optionList.map((option) => renderOptionList(option))}</ul>
    </div>
  );
}
