import store from '../store';
import {setProjectSlot} from '..//../services/data_services';
export default function project_subscriber() {
    let state = store.getState();
    if(state.date.month && state.date.year && state.project.name) {
        console.log("what is the state: ", state, "name: ",state.project.name);
        setProjectSlot(state);
    }
    
}