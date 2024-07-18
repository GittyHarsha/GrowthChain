import EndGoals from "./EndGoals";
import DailyGoals from "./DailyGoals";
import MonthlyGoals from "./MonthlyGoals";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import {getProjectSlot, addProjectSlot} from '../../services/data_services';
import DateDropdown from '../../components/DateDropdown';
import store from '../../redux/store';
import dayjs from 'dayjs';
import setGlobalState from '../../services/global_state';
export default function Project(name, month, year) {
  let projectName = useSelector((state) => state.project.name);
  function update(name, month, year) {
    let projectSlot = getProjectSlot(name, month,year);
    if(!projectSlot) {
      return false;
    }
    else {
      setGlobalState(projectSlot);
      return true;
    }
  }
  function handleMonthClick(month, resetCallback) {
    let state = store.getState();
    let year = state.date.year;
    if(!update(state.project.name, month, year)) {
      resetCallback();
    }
  
  }
  function handleYearClick(year, resetCallback) {
    let state = store.getState();
    let month = state.date.month;
    if(!update(state.project.name, month, year)) {
      resetCallback();
    }
  }
  if (projectName == "") {
    return (
      <div className="flex justify-center align-middle">
        Add or Select a project to begin your journey!
      </div>
    );
  }
  return (
    <div className="h-100 w-100">
        <div className="h-100 w-100 flex justify-around items-center rounded bg-gray-100 mb-2 font-sans text-4xl font-bold text-black-100">
        <center>{projectName}</center>
        <span><DateDropdown handleMonthClick={handleMonthClick} handleYearClick={handleYearClick}/></span>
        </div>
     
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <DailyGoals />
          <MonthlyGoals />
        </div>
        <div className="col-span-1">
          <Progress />
        </div>
        <div className="col-span-1">
          <EndGoals />
        </div>
      </div>
    </div>
  );
}
