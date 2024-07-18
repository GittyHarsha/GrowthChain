import List from '../../components/List';
import {useSelector, useDispatch} from 'react-redux';
import {addGoal, deleteGoal} from '../../redux/slices/goalsSlice';
export default function EndGoals(props) {
    let endGoals = useSelector((state)=> state.goals.endGoals);
    let dispatch = useDispatch();
    function addItem(item) {
        dispatch(addGoal({goalType: 'endGoal', goal: item}));
    }
    function deleteItem(idx) {
        dispatch(deleteGoal({goalType: 'endGoal', index: idx}));
        console.log("index: " + idx);
    }
    return <List
    listName={"EndGoals"}
    viewOnly={false}
    items={endGoals}
    addItem ={addItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
}