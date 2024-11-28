import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LogSymptoms from "./LogSymptoms";
import ButtonOpenLogSymptoms from './ButtonOpenLogSymptoms';
import { selectDate } from '../redux/userSlice';


// Component to render in ListView if no symptoms are logged for selected date
function NoSymptoms() {

    const [showLogSymptoms, setShowLogSymptoms] = useState(false);
    const selectedDate = useSelector(selectDate);


    // event listener to open LogSymptoms modal when user clicks button
    const handleButtonClick = () => {
        setShowLogSymptoms(true);
      };


      // event listener to close LogSymptoms modal when user clicks button
      const closeLogSymptoms = () => {
        setShowLogSymptoms(false);
    }

    return (

        <div>
            <br/>
            <h3>{selectedDate.toDateString()}</h3>
            <br/>
            <h6>No symptoms logged for this date</h6>
            <br/>
            <ButtonOpenLogSymptoms onClick={handleButtonClick} value="Log symptoms"/>

            <LogSymptoms 
                show={showLogSymptoms} 
                closeLogSymptoms={closeLogSymptoms} 
            />           
        </div>
    )
}

export default NoSymptoms;