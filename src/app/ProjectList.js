import List from '../components/List';
import {
  addProject,
  getProjects,
  deleteProject,
  getLatestProjectSlot,
  renameProject,
  getScoreColor,
} from '../services/data_services';
import { useState } from 'react';
import { setProjectName } from '../redux/slices/projectSlice';
import dayjs from 'dayjs';
import setGlobalState from '../services/global_state';
import EditableInput from '../components/EditableInput';
import { useDispatch, useSelector } from 'react-redux';

export default function ProjectList() {
  const dispatch = useDispatch();
  // State handling
  const [projects, setProjects] = useState(getProjects());
  let month = useSelector((state) => state.date.month);
  let year = useSelector((state) => state.date.year);
  if (!month) month = dayjs().month();
  if (!year) year = dayjs().year();

  const [currentProjectName, setCurrentProjectName] = useState(
    useSelector((state) => state.project.name)
  );

  function newProject(name) {
    let project = {
      project: {
        name: name,
      },
      goals: {
        dailyGoals: [],
        monthlyGoals: [],
        endGoals: [],
        lastDate: dayjs().format('DD-MM-YYYY'),
      },
      date: {
        month: dayjs().month(),
        year: dayjs().year(),
      },
      progress: {
        progress: [],
      },
    };
    return project;
  }

  function setProject(project) {
    setGlobalState(project);
  }

  function addItem(item) {
    addProject(newProject(item));
    setProjects([...projects, item]);
  }

  function deleteItem(idx) {
    deleteProject(projects[idx]);
    setProjects(projects.filter((_, index) => index !== idx));
    if (currentProjectName === projects[idx]) {
      dispatch(setProjectName({ name: '' }));
    }
  }

  function onClickFunc(idx) {
    setProject(getLatestProjectSlot(projects[idx], month, year));
    setCurrentProjectName(projects[idx]);
  }

  function handleProjectNameChange(oldName, newName) {
    if (renameProject(oldName, newName)) {
      dispatch(setProjectName({ name: newName }));
      setProjects(getProjects());
    } else {
      alert('Project already exists!');
    }
  }

  function projectComponent(projectName, idx) {
    // highlight the active project with a background color on the icon
    let isActiveProject = projectName === currentProjectName;
    return (
      <div
        key={projectName}
        style={{ border: `3px solid ${getScoreColor(projectName)}` }}
        className="flex items-center p-2 mb-2"
      >
        <svg
          onClick={() => onClickFunc(idx)}
          className={`h-6 w-6 mr-2 cursor-pointer ${
            isActiveProject ? 'bg-yellow-500' : 'bg-white'
          } rounded-full`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <EditableInput
          onSubmit={(newName) => {
            handleProjectNameChange(projectName, newName);
          }}
          inputValue={projectName}
        />
      </div>
    );
  }

  return (
    <List
      /* Remove the fixed height and overflow to get rid of the “side-panel” look */
      listName="Projects"
      viewOnly={false}
      items={projects.map((project, idx) => projectComponent(project, idx))}
      addItem={addItem}
      deleteItem={deleteItem}
    />
  );
}
