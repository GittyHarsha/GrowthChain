import List from '../../components/List';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';
import {addGoal, deleteGoal, setGoals, setLastDate} from '../../redux/slices/goalsSlice';
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
    useEffect(
        ()=> {
            if(dayjs().diff(dayjs(lastDate, 'DD-MM-YYYY'), 'month') >=1) {
                dispatch(setLastDate({date: dayjs().format('DD-MM-YYYY')}));
                dispatch(setGoals({goalType: 'monthlyGoal', goal:[]}));
            }
        }, []
    );
    return <List
    listName={"MonthlyGoals"}
    viewOnly={false}
    items={monthlyGoals}
    addItem ={addItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
}