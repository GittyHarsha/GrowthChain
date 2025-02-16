import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { setProjectName } from "../redux/slices/projectSlice";
dayjs.extend(customParseFormat);
function getDate(month, year) {
  return month + "/" + year;
}

function createProjectSlot(name, month, year) {
  let slot = getDate(month, year);
  let projectSlot = {};
  projectSlot = {
    project: {
      name: name,
    },
    date: {
      month: month,
      year: year,
    },
    progress: {
      progress: [{day: dayjs().date(), value: ""}],
    },
    goals: {
      dailyGoals: [],
      monthlyGoals: [],
      endGoals: [],
      lastDate : dayjs().format('DD-MM-YYYY'),
    },
  };
  return projectSlot;
}


export function setData(data) {
  console.log("setting data: ", data);
  localStorage.setItem("data", JSON.stringify(data));
}
export function getData() {
  let data = localStorage.getItem("data");

  if (!data) {
    setData({});
    return {};
  } else {
    data = JSON.parse(data);
    return data;
  }
}

export function setProject(project, projectName) {
  let data = getData();
  data[projectName] = project;
  setData(data);
}
export function setProjectSlot(project) {
  console.log("inside setProjectSlot and obtained : ", project);
  let slot = getDate(project.date.month, project.date.year);
  let data = getData();
  let projectName = project.project.name;
  if (typeof data[projectName][slot] =='object') {
    data[projectName][slot] = {...project};
    console.log("inside set project Slot: ", project);
    delete data[projectName][slot].project;
    data[projectName][slot]['goals'] = {...project.goals};
    data[projectName]['endGoals']={...project}.goals.endGoals;
    delete data[projectName][slot]['goals']['endGoals'];
    setData(data);
  }
  else {
    console.log("slot: "+slot);
  }
}
export function addProject(project) {
  let data = {...getData()};
  let name = project.project.name;
  let slot = getDate(project.date.month, project.date.year);
  data[name] = {score: 1.0, endGoals:[]};
  data[name][slot] = project;
  data[name][slot] = Object.fromEntries(
    Object.entries(data[name][slot]).filter(([key]) => key !== 'project')
  );
  data[name][slot]['goals'] = Object.fromEntries(
    Object.entries(data[name][slot]['goals']).filter(([key]) => key !== 'endGoals')
  );
  console.log("project that we are adding: ", data[name]);
  setData(data);
}
export function addProjectSlot(name, month, year) {
  let data = {...getData()};
  let slot = getDate(month, year);
  data[name][slot] = createProjectSlot(name, month, year);
  data[name][slot] = Object.fromEntries(
    Object.entries(data[name][slot]).filter(([key]) => key !== 'project')
  );
  data[name][slot]['goals'] = Object.fromEntries(
    Object.entries(data[name][slot]['goals']).filter(([key]) => key !== 'endGoals')
  );
  setData(data);
}
export function getProject(name) {
  let data = getData();
  return data[name];

}
export function getProjectSlot(name, month, year) {
  let slot = getDate(month, year);

  let data = getData();
  if(!data[name][slot]) return null;
  data[name][slot]['project']={};
  data[name][slot]['project']['name']=name;
  data[name][slot]['goals']['endGoals']=data[name]['endGoals'];
  console.log("sending project slot: ", data[name][slot]);
  return data[name][slot];
}

export function incrementScore(projectName) {
  let data = getData();
  let project = getProject(projectName);
  project.score=Math.min(1.0, project.score+0.2);
  setProject(project, projectName);
}
export function decrementScore(projectName) {
  let data = getData();
  let project = getProject(projectName);
  project.score=Math.max(0.0, project.score-0.3);
  setProject(project, projectName);
}

export function getScoreColor(projectName) {
  let score = getProject(projectName).score;
  const red = Math.round(255 * (1 - score));
  const green = Math.round(255 * score);
  return `rgb(${red},${green},0)`;
}

export function getScore(name) {
  return getProject(name).score;
}

export function getLatestProjectSlot(name) {
  let date = dayjs();
  let month = date.month();
  let year = date.year();
  let projectSlot = getProjectSlot(name, month, year);

  if(!projectSlot) {
    addProjectSlot(name, month, year);
    let project = getProjectSlot(name, month, year);
    let prevDate = dayjs().subtract(1, 'month');
    let prevProjectSlot = getProjectSlot(name, prevDate.month(), prevDate.year());
    if(prevProjectSlot) {
      project.goals.endGoals = prevProjectSlot.goals.endGoals;
    }
    setProjectSlot(project);
    return project;

  }
  else {
    let score = getScore(name);
    let lastDate = dayjs(projectSlot.goals.lastDate, 'DD-MM-YYYY');
    console.log("last date: ", lastDate);
    if(date.diff(lastDate, 'day')==0) {

    }
    else if(date.diff(lastDate, 'day')>=1) {
      projectSlot.goals.lastDate = date.format('DD-MM-YYYY');
      for(let dailyGoal of projectSlot.goals.dailyGoals) {
        if(dailyGoal.category=='Boolean') {
          if(dailyGoal.value==false) {
            decrementScore(name);
          }
        }
        else if(dailyGoal.category=='Counter') {
          if(dailyGoal.value !=dailyGoal.maxValue) {
            decrementScore(name);
          }
        }
      }
      projectSlot.goals.dailyGoals = [];
      setProjectSlot(projectSlot);
      
    }
    else if(date.diff(lastDate, 'month')>=1) {
      projectSlot.goals.lastDate = date.format('DD-MM-YYYY');
      for(let monthlyGoal of projectSlot.goals.monthlyGoals) {
        if(monthlyGoal.category!='None') {
          if(monthlyGoal.category=='Boolean' ) {
            if(monthlyGoal.value==false) {
              decrementScore(name);
            }
          }
          else if(monthlyGoal.category=='Counter') {
            if(monthlyGoal.value!=monthlyGoal.maxValue) {
              decrementScore(name);
            }
          }
        }
      }
      projectSlot.goals.dailyGoals = [];
      projectSlot.goals.monthlyGoals= [];
      setProjectSlot(projectSlot);
    }
    let progress = projectSlot.progress.progress;
    console.log("what is the progress: ", progress);
    if(progress.length==0 || dayjs().date()-progress[progress.length-1].day >=1) {
      progress.push({day: dayjs().date(), value: ''});
    }
    return projectSlot;
  }
}
export function deleteProject(name) {
  let data = getData();
  delete data[name];
  setData(data);
}

export function getProjects() {
  let data = getData();
  return Object.keys(data);
}

export function renameProject(oldName, newName) {
  let data = getData();
  if(data[newName]) {
    return false;
  }
  else {
    data[newName]={...data[oldName]};
    delete data[oldName];
    setData(data);
    return true;
  }

}

export function getProjectsScore() {
  let data = getData();
  let score={};
  for(let project in data) {
    score[project] = data[project].score;
  }
  return score;
}
