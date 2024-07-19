import List from '../../components/List';
import {useSelector, useDispatch} from 'react-redux';
import {addGoal, deleteGoal}from '../../redux/slices/goalsSlice';
export default function DailyGoals(props) {
    let dailyGoals = useSelector((state)=> state.goals.dailyGoals);
    let lastDate = useSelector((state)=> state.goals.lastDate);
    
    let dispatch = useDispatch();
    function addItem(item) {
        dispatch(addGoal({goalType: 'dailyGoal', goal: item}));
    }
    function deleteItem(item) {
        dispatch(deleteGoal({goalType: 'dailyGoal', goal: item}));
    }
    

    return <List
    listName={"DailyGoals"}
    viewOnly={false}
    items={dailyGoals}
    addItem ={addItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
}