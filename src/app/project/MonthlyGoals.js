import List from '../../components/List';
import {useSelector, useDispatch} from 'react-redux';
import {addGoal, deleteGoal} from '../../redux/slices/goalsSlice';
export default function MonthlyGoals(props) {
    let monthlyGoals = useSelector((state)=> state.goals.monthlyGoals);
    let lastDate = useSelector((state)=> state.goals.lastDate);
    let dispatch = useDispatch();
    function addItem(item) {
        dispatch(addGoal({goalType: 'monthlyGoal', goal: item}));
    }
    function deleteItem(item) {
        dispatch(deleteGoal({goalType: 'monthlyGoal', goal: item}));
    }
   
    return <List
    listName={"MonthlyGoals"}
    viewOnly={false}
    items={monthlyGoals}
    addItem ={addItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
}