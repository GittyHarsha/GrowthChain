import EndGoals from "./EndGoals";
import DailyGoals from "./DailyGoals";
import MonthlyGoals from "./MonthlyGoals";
import Progress from "./Progress";
import { useSelector } from "react-redux";
import { getProjectSlot, getLatestProjectSlot } from "../../services/data_services";
import DateDropdown from "../../components/DateDropdown";
import store from "../../redux/store";
import setGlobalState from "../../services/global_state";

export default function Project() {
  const projectName = useSelector((state) => state.project.name);
  const projectMonth = useSelector((state) => state.date.month);
  const projectYear = useSelector((state) => state.date.year);

  function update(name, month, year) {
    let projectSlot = getProjectSlot(name, month, year);
    if (!projectSlot) {
      return false;
    } else {
      setGlobalState(projectSlot);
      return true;
    }
  }

  function handleMonthClick(month, resetCallback) {
    let state = store.getState();
    let year = state.date.year;
    if (!update(state.project.name, month, year)) {
      resetCallback();
      setGlobalState(getLatestProjectSlot(state.project.name));
    }
  }

  function handleYearClick(year, resetCallback) {
    let state = store.getState();
    let month = state.date.month;
    if (!update(state.project.name, month, year)) {
      resetCallback();
      setGlobalState(getLatestProjectSlot(state.project.name));
    }
  }

  if (!projectName) {
    return (
      <div className="flex justify-center items-center h-full w-full text-xl font-semibold p-6">
        Add or Select a project to begin your journey!
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 p-6">
      {/* Header: Project Name + Date Selector */}
      <div className="flex justify-between items-center bg-gray-100 p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-black">{projectName}</h1>
        <DateDropdown
          month={projectMonth}
          year={projectYear}
          handleMonthClick={handleMonthClick}
          handleYearClick={handleYearClick}
        />
      </div>

      {/* Responsive Asymmetric Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Daily & Monthly Goals (Smaller) */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <DailyGoals />
          </div>
          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <MonthlyGoals />
          </div>
        </div>

        {/* Center Column: **Progress (Wider for More Space)** */}
        <div className="md:w-2/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <Progress />
        </div>

        {/* Right Column: End Goals (Smaller) */}
        <div className="md:w-1/4 bg-gray-100 p-5 rounded-lg shadow-lg">
          <EndGoals />
        </div>
      </div>
    </div>
  );
}
