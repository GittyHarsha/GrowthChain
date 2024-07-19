import {setDate} from '../redux/slices/dateSlice';
import {setProgress} from '../redux/slices/progressSlice';
import {setProjectName} from '../redux/slices/projectSlice';
import {setGoals, setLastDate} from '../redux/slices/goalsSlice';
import store from '../redux/store';
import dayjs from 'dayjs';
export default function setGlobalState(project) {
    console.log('setGlobalState         project got: ', project, "name: ", project.project.name);
    let dispatch = store.dispatch;
    dispatch(setDate({month: project.date.month, year: project.date.year}));
    dispatch(setProjectName({name: project.project.name}));
    dispatch(setProgress({progress: project.progress.progress}));
    dispatch(setGoals({goalType: "dailyGoals", goals: project.goals.dailyGoals}));
    dispatch(setGoals({goalType: "monthlyGoals", goals: project.goals.monthlyGoals}));
    dispatch(setGoals({goalType: "EndGoals", goals: project.goals.endGoals}));
    dispatch(setLastDate({date: dayjs().format('DD-MM-YYYY')}))
}