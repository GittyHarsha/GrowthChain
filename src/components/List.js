import { useState } from 'react';

export default function List(props) {
  const {
    viewOnly = false,
    items = [],
    onClickFunc = () => {},
    addItem = () => {},
    deleteItem = () => {},
    listName = '',
    listPrepare,
    style = {},
  } = props;

  const [inputText, setInputText] = useState('');
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Toggle dropdown state
  const handleToggleDropdown = (idx) => {
    setOpenDropdownIndex((prev) => (prev === idx ? null : idx));
  };

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
                if (e.key === 'Enter' && inputText.trim()) {
                  addItem(inputText.trim());
                  setInputText('');
                }
              }}
            />
            {/* Clear text button (X) appears only if user typed something */}
            {inputText.length > 0 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                onClick={() => setInputText('')}
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
                setInputText('');
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
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
      <ul style={{ ...style }}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative flex items-center justify-between my-2 p-2 bg-yellow-100 rounded-lg shadow-md"
          >
            {/* Clickable text area */}
            <div className="cursor-pointer flex-grow" onClick={() => onClickFunc(idx)}>
              {item}
            </div>

            {/* Kebab Menu Button (only if not viewOnly) */}
            {!viewOnly && (
              <div className="ml-2">
                <button
                  onClick={() => handleToggleDropdown(idx)}
                  className="p-2 rounded hover:bg-yellow-200"
                >
                  {/* Three-dots Icon (Kebab Icon) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 10 30"
                  >
                    <circle cx="5" cy="4" r="2" />
                    <circle cx="5" cy="14" r="2" />
                    <circle cx="5" cy="24" r="2" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {openDropdownIndex === idx && (
                  <div className="absolute right-1 top-12 bg-white shadow-md rounded z-10 w-24">
                    <ul className="flex flex-col text-black">
                      <li
                        className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          // Optional confirm:
                          // if (window.confirm('Are you sure you want to delete this item?')) {
                          deleteItem(idx);
                          // }
                          setOpenDropdownIndex(null);
                        }}
                      >
                        Delete
                      </li>

                      {/* Add more menu items if needed */}
                      {/* <li className="px-3 py-2 hover:bg-gray-200 cursor-pointer">
                        Something else
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
