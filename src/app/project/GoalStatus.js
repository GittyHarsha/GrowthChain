import { useState } from "react";
export default function GoalStatus({goal, onChange}) {
  let category = goal.category;
  console.log("goal obtained in GoalStatus component: ", goal);
  let [count, setCount] = useState(category == "Counter" ? goal.value : 0);
  let [completed, setCompleted] = useState(
    category == "Boolean" ? goal.value : 0
  );
  function handleChange(change) {
    onChange(change);
  }
  return (
    <>
    <div>{goal.goal}</div>
      {category == "Boolean" ? (
        <div className="bg-yellow-600 w-full flex">
            Completed: 
          <input
            type="checkbox"
            checked={goal.value}
            onClick={(e) => {
              setCompleted(!completed);
              handleChange({goal: goal.goal, category: "Boolean", value: !completed });
            }}
          />
        </div>
      ) : category == "Counter" ? (
        <div className="bg-yellow-600 w-full flex justify-around">
            <button
          className="bg-white font=lg rounded-full"
            onClick={(e) => {
              let counterValue = Math.max(0, goal.value -1);
              setCount(counterValue);
              handleChange({
                goal: goal.goal,
                category: "Counter",
                value: counterValue,
                maxValue: goal.maxValue,
              });
            }}
          >
            -
          </button>
          {goal.value} / {goal.maxValue}
          <button
          className="bg-white font=lg rounded-full"
            onClick={(e) => {
              let counterValue = Math.min(goal.maxValue, goal.value + 1);
              setCount(counterValue);
              handleChange({
                goal: goal.goal,
                category: "Counter",
                value: counterValue,
                maxValue: goal.maxValue,
              });
            }}
          >
            +
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
