import List from '../components/List';
import {addProject, getProjects, deleteProject, getProjectSlot, addProjectSlot} from '../services/data_services';
import {useState} from 'react';
import {setProjectName} from '../redux/slices/projectSlice';
import dayjs from 'dayjs';
import setGlobalState from '../services/global_state';

import { useDispatch, useSelector } from 'react-redux';
export default function ProjectList() {
    let [projects, setProjects] = useState(getProjects());
    let dispatch = useDispatch();
    let month = useSelector((state) =>state.date.month);
    if(!month) month = dayjs().month();
    let year = useSelector((state) => state.date.year);
    if(!year) year = dayjs().year();
    let currentProjectName = useSelector((state)=> state.project.name);
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
        let project = getProjectSlot(projects[idx], month, year);
        if(!project) {
            addProjectSlot(projects[idx], month, year);
            setProject(getProjectSlot(projects[idx], month, year));
        }
        else
        setProject(project);
    }

    return <List
    listName={"Projects"}
    viewOnly={false}
    items={projects}
    addItem ={addItem}
    deleteItem ={deleteItem}
    onClickFunc = {onClickFunc}
    />
}