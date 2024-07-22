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
    <Modal isOpen={isOpen}>
      <div>
        <h1 className="font-xl">Goal Type</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <input
                type="radio"
                value="Boolean"
                checked={goalCategory === "Boolean"}
                onChange={handleCategoryChange}
              />
              Boolean
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Counter"
                checked={goalCategory === "Counter"}
                onChange={handleCategoryChange}
              />
              Counter
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="None"
                checked={goalCategory === "None"}
                onChange={handleCategoryChange}
              />
              None
            </label>
          </div>
          {goalCategory == "Counter" && (
            <div>
              <label>
                Input for {goalCategory}:
                <input
                  type="text"
                  value={counterValue}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )}
          <button className="bg-black text-white" type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
}
