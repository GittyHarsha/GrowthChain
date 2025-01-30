import List from "../../components/List";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProgress } from "../../redux/slices/progressSlice";
import dayjs from 'dayjs';
import _ from 'lodash';
import MDEditor from "@uiw/react-md-editor";
import ExpandableCard from "../../components/ExpandableCard";

export default function Progress(props) {
  let progress = useSelector((state) => state.progress.progress);
  let projectName = useSelector((state) => state.project.name);
  let dispatch = useDispatch();
  const editorRef = useRef(null);

  let items = progress.map((item) => (
    <ExpandableCard
      preview={<MDEditor.Markdown
        source={item.value.slice(0,100)}

        data-color-mode="light"
        className="!bg-white !text-black break-words whitespace-pre-wrap"
      />}
      key={item.day} title={`Day: ${item.day}`}>
      <MDEditor.Markdown
        source={item.value}

        data-color-mode="light"
        className="!bg-white !text-black break-words whitespace-pre-wrap"
      />
    </ExpandableCard>
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
