import "../index.css";
import ProjectList from "./ProjectList";
import Project from './project/Project';
import DownloadJsonButton from "./DownloadJsonButton";
function App() {
  return (
    <div className="grid grid-cols-2">
      <div class="flex h-screen col-span-3">
        <div class="bg-yellow-800 text-white w-64 flex-shrink-0">
          <div class="p-4">
            <h2 class="text-xl font-semibold">GrowthChain</h2>
            <DownloadJsonButton/>
            <ProjectList/>
          </div>
        </div>

        <div class="flex-1 bg-white col-span-9">
          <div class="p-4">
           <Project/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;