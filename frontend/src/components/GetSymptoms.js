import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

// getting the list of symptoms from the database and dynamically adding to jsx checkboxes
function GetSymptoms(props) {

  const [symptoms, setSymptoms] = useState([]);


  // on load gets symptoms from db
  useEffect(() => {
    axios.get('http://localhost:8081/symptoms')
      .then(res => setSymptoms(res.data))
      .catch(err => console.log(err));
  }, []);


  // when symptoms are checked this is updated locally
  // If 'no symptoms' is checked, other checkboxes are diabled
  const handleOnChange = (event) => {
    const { id, checked } = event.target;
    if (id === 'NS') {
      props.handleNoSymptomsChange(checked);
    } else {
      props.handleSymptomChange(id, checked);
    }
  };


  // symptoms from db are rendered as checkboxes
  const renderSymptoms = (symptoms) => {
    return symptoms.map((symptom) => (
      <Form.Check
        type="checkbox"
        key={symptom.symptom_id}
        id={symptom.symptom_id}
        name={symptom.symptom_description}
        checked={symptom.symptom_id === 'NS' ? props.noSymptomsChecked : props.checkedSymptoms.includes(symptom.symptom_id)} // disables other symptoms if 'no symptoms' selected
        onChange={handleOnChange}
        label={symptom.symptom_description}
        disabled={props.noSymptomsChecked && symptom.symptom_id !== 'NS'} // this disables all symptoms except 'No Symptoms'
      />
    ));
  };

  return (
    <div>{renderSymptoms(symptoms)}</div>
  );
}

export default GetSymptoms;
