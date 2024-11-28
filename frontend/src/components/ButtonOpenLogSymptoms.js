import React from 'react';
import '../styles/ButtonOpenLogSymptoms.css';


// a button component to open the log symptoms modal component. 
// Used twice in the app. Once as 'Log Symptoms', and once as 'Edit'.
function ButtonOpenLogSymptoms({ onClick, value }) {
    return (
        <button className="log-button" onClick={onClick}>
            {value}
        </button>
    );

}

export default ButtonOpenLogSymptoms;
