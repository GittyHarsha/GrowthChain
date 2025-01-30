import { useState, useEffect, useRef } from "react";

export default function GoalTypePopover({
  isOpen,
  top = 0, // Default to 0 if not provided
  left = 0, // Default to 0 if not provided
  onSubmit,
  goal,
  onClose,
}) {
  const [goalCategory, setGoalCategory] = useState("None");
  const [counterValue, setCounterValue] = useState(0);

  // Reset form each time a new goal is set or popover is reopened
  useEffect(() => {
    if (isOpen) {
      setGoalCategory("None");
      setCounterValue(0);
    }
  }, [isOpen, goal]);

  function handleCategoryChange(e) {
    setGoalCategory(e.target.value);
  }

  function handleInputChange(e) {
    setCounterValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let payload = { goal, category: "None" };

    if (goalCategory === "Boolean") {
      payload = { goal, category: "Boolean", value: false };
    } else if (goalCategory === "Counter") {
      payload = {
        goal,
        category: "Counter",
        value: 0,
        maxValue: counterValue,
      };
    }

    // Call parent's submit logic
    onSubmit(payload);
  }

  // If not open, don't render anything
  if (!isOpen) return null;

  return (
    <div
      className="bg-yellow-100 text-brown-700 rounded-lg shadow-md p-4 z-50"
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <h1 className="text-xl font-bold mb-4">Goal Type</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">
          Select Goal Type:
          <select
            className="block w-full mt-1 p-2 rounded border border-gray-300 
                       focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            value={goalCategory}
            onChange={handleCategoryChange}
          >
            <option value="None">None</option>
            <option value="Boolean">Boolean</option>
            <option value="Counter">Counter</option>
          </select>
        </label>

        {goalCategory === "Counter" && (
          <label className="block">
            Counter Max Value:
            <input
              type="number"
              value={counterValue}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 
                         rounded focus:outline-none focus:ring-yellow-500 
                         focus:border-yellow-500"
            />
          </label>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-brown-600 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-yellow-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
