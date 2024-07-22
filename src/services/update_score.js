import store from '../redux/store';
import {incrementScore, decrementScore} from '../services/data_services';
export default function updateScore(before, after) {
    let projectName = store.getState().project.name;
    let category = before.category;
    switch(category) {
        case 'Boolean': {
            if(after.value==true) {
                incrementScore(projectName);
            }
            else {
                decrementScore(projectName);
            }
            break;
        }
        case 'Counter': {
            if(after.value==after.maxValue) {
                incrementScore(projectName);
            }
            else if(before.value==before.maxValue) {
                decrementScore(projectName);
            }
        }
        default: {
            break;
        }
    }
}