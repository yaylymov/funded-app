import {configureStore} from '@reduxjs/toolkit';
import questionnaireReducer from './questionnaireSlice.js';

const store = configureStore({
    reducer: {
        questionnaire: questionnaireReducer,
    },
});

export default store;
