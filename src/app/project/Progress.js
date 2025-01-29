import List from "../../components/List";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProgress } from "../../redux/slices/progressSlice";
import dayjs from 'dayjs';
import _ from 'lodash';
import MDEditor from "@uiw/react-md-editor";

export default function Progress(props) {
  let progress = useSelector((state) => state.progress.progress);
  let projectName = useSelector((state) => state.project.name);
  let dispatch = useDispatch();
  const editorRef = useRef(null);

  let items = progress.map((item) => (
    <div key={item.day}>
      <h2 className="bg-white rounded font-bold font-sans">Day: {item.day}</h2>
      <MDEditor.Markdown source={item.value} style={{ backgroundColor: "#ffffff", color: "#000000", padding: "10px", borderRadius: "5px" }} />
    </div>
  ));

  let [dayProgress, setDayProgress] = useState(progress[progress.length - 1] || { day: dayjs().date(), value: "" });

  useEffect(() => {
    setDayProgress(progress[progress.length - 1] || { day: dayjs().date(), value: "" });
  }, [projectName]);

  function onChangeHandler(content) {
    setDayProgress((prev) => {
      if (prev.value === content) return prev;
      let day = dayjs().date();
      let progressObj = { day: day, value: content };
      
      let dispatchProgress = [...progress];
      if (dispatchProgress.length > 0) {
        dispatchProgress[dispatchProgress.length - 1] = progressObj;
      } else {
        dispatchProgress.push(progressObj);
      }
      
      _.debounce(() => {
        dispatch(setProgress({ progress: dispatchProgress }));
      }, 500)();
      
      return progressObj;
    });
  }

  return (
    <div>
      <List 
        style={{ maxHeight: '70vh', overflowY: 'scroll' }}
        listPrepare={
          <MDEditor 
            ref={editorRef}
            value={dayProgress.value} 
            onChange={onChangeHandler}
            data-color-mode="light"
          />
        }
        listName={"Progress"} 
        viewOnly={true} 
        items={items.slice(0, -1).reverse()} 
      />
    </div>
  );
}
