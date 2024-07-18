import store from '../store';
import {setProjectSlot} from '..//../services/data_services';
export default function project_subscriber() {
    let state = store.getState();
    if(state.date.month && state.date.year && state.project.name) {
        setProjectSlot(state);
    }
    
}