import Modal from "../../components/Modal";
import { useState } from "react";
export default function GoalTypeModal(props) {
  let isOpen = props.isOpen;
  let [goalCategory, setGoalCategory] = useState("None");
  let [counterValue, setCounterValue] = useState(0);
  function handleCategoryChange(event) {
    setGoalCategory(event.target.value);
  }
  function handleInputChange(e) {
    setCounterValue(e.target.value);
  }
  function handleSubmit(e) {
    let payload = { goal: props.goal, category: "None" };
    if (goalCategory == "Boolean") {
      payload = { goal: props.goal, category: "Boolean", value: false };
    } else if (goalCategory == "Counter") {
      payload = {
        goal: props.goal,
        category: "Counter",
        value: 0,
        maxValue: counterValue,
      };
    }
    props.onSubmit(payload);
  }
  return (
    <Modal isOpen={isOpen} className="p-6 bg-yellow-100 rounded-lg shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-brown-700 mb-2">Goal Type</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="radio"
                value="Boolean"
                checked={goalCategory === "Boolean"}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              Boolean
            </label>
          </div>
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="radio"
                value="Counter"
                checked={goalCategory === "Counter"}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              Counter
            </label>
          </div>
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="radio"
                value="None"
                checked={goalCategory === "None"}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              None
            </label>
          </div>
          {goalCategory == "Counter" && (
            <div className="mt-4">
              <label className="block text-brown-700">
                Input for {goalCategory}:
                <input
                  type="text"
                  value={counterValue}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                />
              </label>
            </div>
          )}
          <button className="mt-4 bg-brown-700 text-white py-2 px-4 rounded hover:bg-brown-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500" type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
