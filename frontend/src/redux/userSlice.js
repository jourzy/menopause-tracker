import { createSlice, createSelector } from '@reduxjs/toolkit';

export const userReducer = createSlice({
    name: 'user',
    initialState: {
    userId: "",
    symptoms: [],
    dateString: new Date().toISOString(),

        
    },
    reducers: {
        addUserId: (state, action) => {
            return {
                ...state,
                userId : action.payload
            }
            
        },

        addSelectedDate: (state, action) => {
            return {
                ...state,
                dateString : action.payload
            }
            
        },
        addSymptom: (state, action) => {
            return {
                ...state,
                symptoms: [...state.symptoms, action.payload]
            }
        },
        emptySymptoms: (state) => {
            return {
                ...state,
                symptoms: []
            }
        },
        addSymptoms: (state, action) => {
            return {
                ...state,
                symptoms : [action.payload]
            }
        }
        
    },
}
)

/** Create a selector to turn dateString back into date object */ 
export const selectDate = createSelector(
    store => store.user.dateString, 
    dateStr => new Date(dateStr)
);

// Create a selector to turn date object into format for querying database
export const selectSubmittedDate = createSelector(
    selectDate, 
    date => date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
);

// Action creators are generated for each case reducer function
export const { addUserId, addSelectedDate, addSymptom, emptySymptoms, addDateToSubmit, addSymptoms } = userReducer.actions

export default userReducer.reducer