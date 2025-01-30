import { useState } from "react";

export default function List(props) {
  const {
    viewOnly = false,
    items = [],
    onClickFunc = () => {},
    addItem = () => {},
    deleteItem = () => {},
    listName = "",
    listPrepare,
    style = {},
  } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [inputText, setInputText] = useState("");

  return (
    <div className="m-2 p-3 rounded-lg shadow-md bg-yellow-400 border-b border-white text-black">
      {/* List Title */}
      <h2 className="text-xl font-bold text-center mb-2">{listName}</h2>

      {/* Optional content above list */}
      {listPrepare && <div className="mb-2 text-center">{listPrepare}</div>}

      {/* Add Item Section */}
      {!viewOnly && (
        <div className="flex items-center gap-2 mb-4">
          {/* Text Input */}
          <div className="relative w-full">
            <input
              className="w-full bg-white text-black p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Add new item..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputText.trim()) {
                  addItem(inputText.trim());
                  setInputText("");
                }
              }}
            />
            {/* Clear text button (X) appears only if user typed something */}
            {inputText.length > 0 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                onClick={() => setInputText("")}
              >
                X
              </button>
            )}
          </div>

          {/* Add Button on the right */}
          <button
            className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-lg shadow flex items-center justify-center"
            onClick={() => {
              if (inputText.trim()) {
                addItem(inputText.trim());
                setInputText("");
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
          </button>
        </div>
      )}

      {/* List Items */}
      <ul style={{...style}}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between my-2 p-3 bg-yellow-100 rounded-lg shadow-md transition duration-300"
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(-1)}
          >
            {/* Clickable text area */}
            <div
              className="cursor-pointer flex-grow"
              onClick={() => onClickFunc(idx)}
            >
              {item}
            </div>

            {/* Delete button (only if not viewOnly and hovered) */}
            {!viewOnly && hoverIndex === idx && (
              <button
                className="ml-2 text-black hover:text-red-600"
                onClick={() => deleteItem(idx)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
