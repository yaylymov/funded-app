import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    step: 1,
    answers: {
        state: '',
        company_size: '',
        areas: '',
        grants_amount: '',
        revenue: '',
    },
};

const questionnaireSlice = createSlice({
    name: 'questionnaire',
    initialState,
    reducers: {
        setAnswer: (state, action) => {
            state.answers[action.payload.name] = action.payload.value;
        },
        nextStep: (state) => {
            if (state.step < 5) {
                state.step += 1;
            }
        },
        previousStep: (state) => {
            if (state.step > 1) {
                state.step -= 1;
            }
        },
        resetQuestionnaire: (state) => {
            return initialState;
        },
    },
});

export const {setAnswer, nextStep, previousStep, resetQuestionnaire} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
