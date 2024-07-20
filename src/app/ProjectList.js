import List from '../components/List';
import {addProject, getProjects, deleteProject, getLatestProjectSlot, renameProject} from '../services/data_services';
import {useState} from 'react';
import {setProjectName} from '../redux/slices/projectSlice';
import dayjs from 'dayjs';
import setGlobalState from '../services/global_state';
import EditableInput from '../components/EditableInput';
import { useDispatch, useSelector } from 'react-redux';
export default function ProjectList() {
    let [projects, setProjects] = useState(getProjects());

    let dispatch = useDispatch();
    let month = useSelector((state) =>state.date.month);
    if(!month) month = dayjs().month();
    let year = useSelector((state) => state.date.year);
    if(!year) year = dayjs().year();
    let [currentProjectName, setCurrentProjectName] = useState(useSelector((state)=> state.project.name));
    function newProject(name) {
        let project={
            project: {
                name: name
            },
            goals: {
                dailyGoals:[],
                monthlyGoals: [],
                endGoals: [],
                lastDate: dayjs().format('DD-MM-YYYY'), 
            },
            date: {
                month: dayjs().month(),
                year: dayjs().year()
            },
            progress: {
                progress: []
            }
        };
        return project;
    }
    function setProject(project) {
        console.log("project that UI got: ", project);
       setGlobalState(project);
        
    }
        
    function addItem(item) {
        addProject(newProject(item));
        setProjects([...projects, item]);
    }
    function deleteItem(idx) {
        deleteProject(projects[idx]);
        setProjects(projects.filter((_, index) => index !== idx));
        if(currentProjectName ===projects[idx]) {
            dispatch(setProjectName({name: ""}));
        }
    }
    function onClickFunc(idx) {
        setProject(getLatestProjectSlot(projects[idx], month, year));
        setCurrentProjectName(projects[idx]);
    }

    function handleProjectNameChange(oldName, newName) {
        if(renameProject(oldName, newName)) {
            dispatch(setProjectName({name: newName}));
            setProjects(getProjects());
        }
        else {
            alert("Project already exists!");
        }

    }
    function projectComponent(projectName, idx) {
        let setGreen = projectName == currentProjectName;
        return (
            <div className="flex w-100 h-100 align-middle">
                <svg 
                onClick = {(e)=> {onClickFunc(idx);}}
                className={`h-[25px] w-[25x] ${setGreen ? "bg-yellow-500" : "bg-white"} rounded-full`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <EditableInput 
                onSubmit={(newName)=>{handleProjectNameChange(projectName, newName)}} 
                inputValue={projectName}

                />
            </div>
        );
    }
    return <List
    listName={"Projects"}
    viewOnly={false}
    items={projects.map((project, idx)=> (projectComponent(project, idx)))}
    addItem ={addItem}
    deleteItem ={deleteItem}
    />
}