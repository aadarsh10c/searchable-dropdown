import "./styles.css";
import Searchabledropdown from "./SearchableDropDown";
import { useState } from "react";

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

export default function App() {
  const [ displayVal, setdisplayVal] = useState("")
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Searchabledropdown 
      defaultOptionList={defaultOptionList} 
      selectedValue={displayVal}
      selectedValFn={setdisplayVal}
      placeholder={"by contract name"}
      />
      <h1>Selected Val: {displayVal}</h1>
    </div>
  );
}
