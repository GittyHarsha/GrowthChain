import List from '../../components/List';
import { useSelector, useDispatch } from 'react-redux';
import { addGoal, deleteGoal, setGoals } from '../../redux/slices/goalsSlice';
import GoalStatus from './GoalStatus';
import { useState, useRef } from 'react';
import GoalTypePopover from './GoalTypePopover';
import updateScore from '../../services/update_score';

export default function MonthlyGoals(props) {
  const monthlyGoals = useSelector((state) => state.goals.monthlyGoals);
  const dispatch = useDispatch();

  // For controlling our popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState('');

  // A ref to the input or add button in <List> to position the popover
  // (Optional – see "GoalTypePopover" for how to measure anchorRef)
  const addButtonRef = useRef(null);

  // Convert monthlyGoals to <GoalStatus> items
  const items = monthlyGoals.map((goal, idx) => (
    <GoalStatus
      key={idx}
      goal={goal}
      onChange={(updatedGoal) => handleGoalUpdate(updatedGoal, idx)}
    />
  ));

  function handleGoalUpdate(goal, idx) {
    let goalsCopy = [...monthlyGoals];
    goalsCopy[idx] = goal;

    // Example: calling updateScore
    updateScore(monthlyGoals[idx], goal);

    dispatch(setGoals({ goalType: 'monthlyGoals', goals: goalsCopy }));
  }

  // Called from <List> when user presses Enter or plus sign
  function handleAddItem(text) {
    setIsPopoverOpen(true);
    setCurrentGoal(text);
  }

  // Called by popover's "Submit" button
  function onPopoverSubmit(goalData) {
    addItem(goalData);
    setIsPopoverOpen(false);
  }

  function addItem(item) {
    // item might be just a string or an object with category
    dispatch(addGoal({ goalType: 'monthlyGoal', goal: item }));
  }

  function deleteItem(idx) {
    dispatch(deleteGoal({ goalType: 'monthlyGoal', index: idx }));
  }

  return (
    <>
      <div className="relative">
        {/* The parent <div> is relative so we can absolutely-position the popover inside it */}

        <List
          listName="MonthlyGoals"
          viewOnly={false}
          items={items}
          addItem={handleAddItem}
          deleteItem={deleteItem}
          className="bg-blue"
          addButtonRef={addButtonRef} 
          // ^ optional if you want to pass this ref to <List> so it can attach 
          //   to the + button, then your popover can measure it exactly
        />

        {/* Floating popover near the input/add button */}
        <GoalTypePopover
          isOpen={isPopoverOpen}
          anchorRef={addButtonRef} // pass a reference if you want dynamic positioning
          onSubmit={onPopoverSubmit}
          goal={currentGoal}
          onClose={() => setIsPopoverOpen(false)}
        />
      </div>
    </>
  );
}
