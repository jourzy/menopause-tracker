import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import LogSymptoms from "./LogSymptoms";
import ButtonOpenLogSymptoms from './ButtonOpenLogSymptoms';
import axios from 'axios';
import { selectDate, selectSubmittedDate, emptySymptoms } from '../redux/userSlice';
import '../styles/ButtonOpenLogSymptoms.css';


// Component to render in ListView if user symptoms have been logged for this date
// Displays the selected date and a list of the symptoms logged by the user
function RenderUserSymptoms() {

    const [showLogSymptoms, setShowLogSymptoms] = useState(false);
    const user = useSelector((state) => state.user.userId);
    const selectedDate = useSelector(selectDate);
    const userSymptoms = useSelector((state) => state.user.symptoms);
    const dateToSubmit = useSelector(selectSubmittedDate);
    const dispatch = useDispatch();


    // event listener to open LogSymptoms modal when user clicks button
    const handleButtonClick = () => {
      setShowLogSymptoms(true);
    };


    // event listener to close LogSymptoms modal when user clicks button
    const closeLogSymptoms = () => {
      setShowLogSymptoms(false);
  }

    // event listener to delete user symptoms for selected date from the db
    // Also updates the userSymptoms in redux store
    const deleteSymptoms = () => {
      const queryData = {user: user, date: dateToSubmit};
      axios.post('http://localhost:8081/user/diary/delete', queryData)
    .then(res => {
      console.log(res);
      })
    .catch(err => console.log(err)); 
    dispatch(emptySymptoms());
  }


    return (
        <div>
            <div>
              <br/>
            <h3>Symptoms for {selectedDate.toDateString()}</h3>
            <br/>
            <ListGroup>          
                {userSymptoms.map((symptom, index) => (
                  <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
                ))}
            </ListGroup>
          </div>
          <div>
            <br/>
            <ButtonOpenLogSymptoms className="edit-button" onClick={handleButtonClick} value="Edit"/>
            <button className="delete-button" onClick={deleteSymptoms}>Delete</button>
            <LogSymptoms 
                  show={showLogSymptoms} 
                  closeLogSymptoms={closeLogSymptoms} 
              />
          </div>
        </div>
    )
}

export default RenderUserSymptoms;

