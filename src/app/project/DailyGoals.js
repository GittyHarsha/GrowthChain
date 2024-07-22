import List from '../../components/List';
import {useSelector, useDispatch} from 'react-redux';
import GoalTypeModal from './GoalTypeModal';
import {useState} from 'react';
import {addGoal, deleteGoal, setGoals}from '../../redux/slices/goalsSlice';
import GoalStatus from './GoalStatus';
import updateScore from '../../services/update_score';
export default function DailyGoals(props) {
    let dailyGoals = useSelector((state)=> state.goals.dailyGoals);
    let [currentGoal, setCurrentGoal] = useState('');
    let lastDate = useSelector((state)=> state.goals.lastDate);
    let [isModalOpen, setIsModalOpen] = useState(false);
    let dispatch = useDispatch();
    let items = dailyGoals.map(
        (goal, idx)=> (
                <GoalStatus goal={goal} onChange={(goal)=> {handleGoalUpdate(goal, idx)}}/>
        )
    );
    function handleGoalUpdate(goal, idx) {
        let goals = [...dailyGoals];
        updateScore(goals[idx], goal);
        goals[idx]= goal;

        dispatch(setGoals({goalType: 'dailyGoals', goals: goals}));
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
        dispatch(addGoal({goalType: 'dailyGoal', goal: item}));
    }
    function deleteItem(item) {
        dispatch(deleteGoal({goalType: 'dailyGoal', goal: item}));
    }
    
    

    return <>
    <List
    listName={"DailyGoals"}
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