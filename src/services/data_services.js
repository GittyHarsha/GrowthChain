import dayjs from "dayjs";
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
      progress: [],
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

export function setProject(project) {
  let data = getData();
  data[project.project.name] = project;
  setData(data);
}
export function setProjectSlot(project) {
  let slot = getDate(project.date.month, project.date.year);
  let data = getData();
  if (typeof data[project.project.name][slot] =='object') {
    data[project.project.name][slot] = project;
    setData(data);
  }
  else {
    console.log("slot: "+slot);
  }
}
export function addProject(project) {
  let data = getData();
  let name = project.project.name;
  let slot = getDate(project.date.month, project.date.year);
  data[name] = {};
  data[name][slot] = project;
  setData(data);
}
export function addProjectSlot(name, month, year) {
  let data = getData();
  let slot = getDate(month, year);
  data[name][slot] = createProjectSlot(name, month, year);
  setData(data);
}
export function getProject(name) {
  let data = getData();
  return data[name];
}
export function getProjectSlot(name, month, year) {
  let slot = getDate(month, year);
  let data = getData();
  return data[name][slot];
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