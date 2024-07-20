import { useState, useEffect } from "react";
export default function List(props) {
  let viewOnly = props.viewOnly;
  let items = props.items;
  let onClickFunc = props.onClickFunc ? props.onClickFunc : (e) => {};
  let addItem = props.addItem;
  let deleteItem = props.deleteItem;
  let [focus, setFocus] = useState(-1);
  let [inputText, setInputText] = useState("");
  let listName = props.listName ? props.listName : "";
  return (
    <div className="rounded-lg shadow-md bg-yellow-400 border-b border-white-400 m-1 p-1 text-black h-100">
      <center>
        <div className="text-lg font-bold">{listName}</div>
        {props.listPrepare}
      </center>
      {viewOnly == false ? (
        <div className="flex">
          <button
            onClick={(e) => {
              if (inputText) {
                addItem(inputText);
                setInputText("");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
          <input
            className="w-[9vw] m-1 rounded"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            type="text"
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                addItem(inputText);
                setInputText("");
              }
            }}
            class="bg-white text-black-400 p-1 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-black-500 w-100"
            placeeholder="Enter text here"
          />
          <button
            style={{ display: inputText.length > 0 ? "block" : "none" }}
            onClick={(e) => {
              setInputText("");
            }}
          >
            X
          </button>
        </div>
      ) : (
        <></>
      )}
      <ul>
        {items.map((item, idx) => (
          <li
            className="flex justify-between h-auto p-4 shadow-md transition duration-300 ease-in-out m-2 border-b border-white-400 text-black bg-yellow-100 rounded-lg"
            key={idx}
            onMouseEnter={(e) => {
              setFocus(idx);
            }}
            onMouseLeave={(e) => {
              setFocus(-1);
            }}
          >
            <div className="w-50"
              onClick={(e) => {
                onClickFunc(idx);
              }}
            >
              {item}
            </div>
            {viewOnly == false && focus == idx ? (
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  onClick={(e) => {
                    deleteItem(idx);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
