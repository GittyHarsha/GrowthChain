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

  // A helper function to update global state based on project slot:
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
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {/* Project Header and Month-Year Selector */}
      <div className="flex justify-between items-center rounded bg-gray-100 p-4 shadow-md">
        <h1 className="text-3xl font-bold text-black-100">
          {projectName}
        </h1>
        <DateDropdown
          month={projectMonth}
          year={projectYear}
          handleMonthClick={handleMonthClick}
          handleYearClick={handleYearClick}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <DailyGoals />
          </div>
          <div className="bg-gray-100 p-4 rounded shadow-md">
            <MonthlyGoals />
          </div>
        </div>

        {/* Middle Column */}
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <Progress />
        </div>

        {/* Right Column */}
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <EndGoals />
        </div>
      </div>
    </div>
  );
}
