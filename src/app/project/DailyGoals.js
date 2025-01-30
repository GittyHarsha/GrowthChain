import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../../components/List";
import GoalTypePopover from "./GoalTypePopover";
import { addGoal, deleteGoal, setGoals } from "../../redux/slices/goalsSlice";
import GoalStatus from "./GoalStatus";
import updateScore from "../../services/update_score";

export default function DailyGoals(props) {
  const dailyGoals = useSelector((state) => state.goals.dailyGoals);
  const dispatch = useDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  // Ref for the input or + button to determine position
  const addButtonRef = useRef(null);

  // Convert dailyGoals to GoalStatus components
  const items = dailyGoals.map((goal, idx) => (
    <GoalStatus
      key={idx}
      goal={goal}
      onChange={(updatedGoal) => handleGoalUpdate(updatedGoal, idx)}
    />
  ));

  function handleGoalUpdate(goal, idx) {
    let goalsCopy = [...dailyGoals];
    updateScore(goalsCopy[idx], goal);
    goalsCopy[idx] = goal;
    dispatch(setGoals({ goalType: "dailyGoals", goals: goalsCopy }));
  }

  // When user presses Enter or clicks "+", open the popover
  function handleAddItem(text) {
    if (addButtonRef.current) {
      const rect = addButtonRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.bottom + window.scrollY + 5, // Position below button
        left: rect.left + window.scrollX, // Align with button
      });
    }
    setIsPopoverOpen(true);
    setCurrentGoal(text);
  }

  // When popover form is submitted
  function onPopoverSubmit(goalData) {
    if (goalData) {
      dispatch(addGoal({ goalType: "dailyGoal", goal: goalData }));
    }
    setIsPopoverOpen(false);
  }

  function deleteItem(idx) {
    dispatch(deleteGoal({ goalType: "dailyGoal", index: idx }));
  }

  return (
    <div className="relative">
      {/* List component where user adds/removes goals */}
      <List
        listName="DailyGoals"
        viewOnly={false}
        items={items}
        addItem={handleAddItem}
        deleteItem={deleteItem}
        className="bg-blue"
        addButtonRef={addButtonRef} // Pass ref to position the popover
      />

      {/* Floating popover near the button/input */}
      <GoalTypePopover
        isOpen={isPopoverOpen}
        top={popoverPosition.top} // Parent sets the position
        left={popoverPosition.left}
        onSubmit={onPopoverSubmit}
        goal={currentGoal}
      />
    </div>
  );
}
