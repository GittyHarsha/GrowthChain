import List from '../../components/List';
import {useSelector, useDispatch} from 'react-redux';
import {addGoal, deleteGoal, setGoals} from '../../redux/slices/goalsSlice';
import GoalStatus from './GoalStatus';
import {useState} from 'react';
import GoalTypeModal from './GoalTypeModal';
import updateScore from '../../services/update_score';
export default function MonthlyGoals(props) {
    let monthlyGoals = useSelector((state)=> state.goals.monthlyGoals);
    let lastDate = useSelector((state)=> state.goals.lastDate);
    let [currentGoal, setCurrentGoal] = useState('');
    let dispatch = useDispatch();
    let [isModalOpen, setIsModalOpen] = useState(false);
    let items = monthlyGoals.map(
        (goal, idx)=> (
                <GoalStatus goal={goal} onChange={(goal)=> {handleGoalUpdate(goal, idx)}}/>
        )
    );
    function handleGoalUpdate(goal, idx) {
        let goals = [...monthlyGoals];
        goals[idx]= goal;
        updateScore(goals[idx], goal);
        dispatch(setGoals({goalType: 'monthlyGoals', goals: goals}));
    }
    function handleAddItem(goal) {
        setIsModalOpen(true);
        setCurrentGoal(goal);
    }
    function onModalSubmit(goal) {
        addItem(goal);
        setIsModalOpen(false);
    }
    function addItem(item) {
        dispatch(addGoal({goalType: 'monthlyGoal', goal: item}));
    }
    function deleteItem(item) {
        dispatch(deleteGoal({goalType: 'monthlyGoal', index: item}));
    }
   
    return <>
    <List
    listName={"MonthlyGoals"}
    viewOnly={false}
    items={items}
    addItem ={handleAddItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
    <GoalTypeModal
    isOpen={isModalOpen}
    onSubmit={onModalSubmit}
    goal={currentGoal}
    />
    </> 
}