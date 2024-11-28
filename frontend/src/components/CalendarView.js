import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ListView from './ListView';
import { addSelectedDate, addSymptom, 
        emptySymptoms, selectDate, selectSubmittedDate } from '../redux/userSlice';
import '../styles/CalendarView.css';


// the main component of the homepage
const CalendarView = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userId);
  const selectedDate = useSelector(selectDate);
  const dateToSubmit = useSelector(selectSubmittedDate);
  const userSymptoms = useSelector((state) => state.user.symptoms);


  useEffect(() => {
    // getting the symptoms for the user on a specific date
    const queryData = {user: user, date: dateToSubmit};
    // console.log(queryData);
    axios.post('http://localhost:8081/user/symptoms', queryData)
      .then(res => {
        dispatch(emptySymptoms())
        res.data.forEach((item) => {
          dispatch(addSymptom(item.symptom_description))
        })
       })
    .catch(err => console.log(err));
  }, [user, dispatch, dateToSubmit]) 
 

  // when the user clicks a date in the calendar the selectedDate 
  // is updated as a string in redux store
  // to avoid error: cannot add unserialized data to redux
  const handleDateClick = (date) => {
    dispatch(addSelectedDate(date.toISOString()));
  };

  // CalendarView has two child components: Calendar and ListView
  return (
    <div style={{ display: 'flex' }}>
      <div className="calendar-container" style={{ marginRight: '20px' }}>
        <Calendar onClickDay={handleDateClick} />
      </div>
      <div className="list-container">
        <ListView symptoms={userSymptoms} selectedDate={selectedDate}/>
      </div>
    </div>
  );
};

export default CalendarView;