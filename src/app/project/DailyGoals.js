import List from '../../components/List';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addGoal, deleteGoal, setLastDate, setGoals} from '../../redux/slices/goalsSlice';
import dayjs from 'dayjs';
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
    useEffect(
        ()=> {
            if(dayjs().diff(dayjs(lastDate, 'DD-MM-YYYY'), 'day') >=1) {
                dispatch(setLastDate({date: dayjs().format('DD-MM-YYYY')}));
                dispatch(setGoals({goalType:"dailyGoal", goal:[]}));
            }
        }, []
    );

    return <List
    listName={"DailyGoals"}
    viewOnly={false}
    items={dailyGoals}
    addItem ={addItem}
    deleteItem ={deleteItem}
    className={"bg-blue"}
    />
}