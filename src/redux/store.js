import {configureStore} from '@reduxjs/toolkit';
import dateReducer from './slices/dateSlice';
import goalsReducer from './slices/goalsSlice';
import progressReducer from './slices/progressSlice';
import projectReducer from './slices/projectSlice';
import project_subscriber from '../redux/subscribers/project_subscriber';
const store = configureStore({
    reducer: {
        date: dateReducer,
        goals: goalsReducer,
        progress: progressReducer,
        project: projectReducer
    }
});
store.subscribe(project_subscriber);
export default store;