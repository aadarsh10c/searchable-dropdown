import React, { useState, useRef, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";


export default function Searchabledropdown({ defaultOptionList, selectedValue, selectedValFn}) {
  const [optionList, setOptionList] = useState(defaultOptionList);
  const [filteredList, setFilteredList] = useState(optionList);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null)

  function handleClickOutside(event){
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDisplayDropdown(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[])

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
    selectedValFn(value);
    handleFilter(value);
  }

  function setDropDownValues(e) {
    e.preventDefault();
    setFilteredList(optionList);
    setDisplayDropdown(true);
  }
  return (
    <div className="search-box"  ref={dropdownRef}>
      <div className="search-box_input">
        <input
          ref={inputRef}
          type="text"
          className="search-box_input-text"
          placeholder="by cotnract name"
          value={selectedValue}
          onFocus={setDropDownValues}
          // onBlur={() => setDisplayDropdown(false)}
          onChange={(e) => handleAnswer(e)}
        />
        <span onClick={() => inputRef.current.focus()}>
          <MdArrowDropDown className="search-box_input-icon" />
        </span>
      </div>
      {displayDropdown && (
        <Dropdown setAnswerFn={selectedValFn} setDisplayDropdownFn={setDisplayDropdown} optionList={filteredList} />
      )}
    </div>
  );
}

function Dropdown({ setAnswerFn,setDisplayDropdownFn, optionList }) {
  function handleOnClick(e, text) {
    e.preventDefault();
    setAnswerFn(text);
    setDisplayDropdownFn(false)
  }

  function renderOptionList(option) {
    return (
      <li key={option} 
        onClick={(e) => handleOnClick(e, option)}
      >
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
