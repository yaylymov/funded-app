import {configureStore} from '@reduxjs/toolkit';
import questionnaireReducer from '../components/questionnaireSlice.js';

const store = configureStore({
    reducer: {
        questionnaire: questionnaireReducer,
    },
});

export default store;
