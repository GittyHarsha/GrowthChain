import List from "../../components/List";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProgress, setProgress } from "../../redux/slices/progressSlice";
import dayjs from 'dayjs';
import _ from 'lodash';
export default function Progress(props) {
  let progress = useSelector((state) => state.progress.progress);
  let dispatch = useDispatch();
  let items = progress.map((item) => <p>{item.value}</p>);
  let [dayProgress, setDayProgress] = useState(progress.length>0? progress[progress.length-1]: "");
  function onChangeHandler(event) {
    let val = event.target.value;
    let day = dayjs().date();
    let progressObj = {day: day, value: val};
    setDayProgress(progressObj);
    let dispatchProgress = [...progress];
    if(dispatchProgress.length>0) {
        dispatchProgress[dispatchProgress.length-1]=progressObj;
    }
    else {
        dispatchProgress.push(progressObj);
    }
    _.debounce(()=>{dispatch(setProgress({progress: dispatchProgress}))}, 500);
    
  }

  return(
  <div>
    
    <List 
    listPrepare={<textarea value={dayProgress.value} className="w-full p-1 " style={{border: '0px solid black'}} onChange={onChangeHandler}/>}
    listName={"Progress"} viewOnly={true} items={items.slice(0, -1)} />
  </div>)
}
