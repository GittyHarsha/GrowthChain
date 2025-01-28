import store from '../store';
import {setProjectSlot} from '..//../services/data_services';
export default function project_subscriber() {
    let state = store.getState();
    console.log("subscriber hit and obtained  state: ", state);
    if(state.date.month !=null  && state.date.year && state.project.name) {
        setProjectSlot(state);
    }
    else {
        console.log("miraska");
    }
    
}