import React, { useState } from 'react';
import GetSymptoms from './GetSymptoms';
import '../styles/SymptomsList.css';


// Takes the symptoms checklist component GetSymptoms,
// and locally stores whether the symptoms has been checked or not
function SymptomsList() {

  const [checkedSymptoms, setCheckedSymptoms] = useState([]);
  const [noSymptomsChecked, setNoSymptomsChecked] = useState(false);


  // event listener to add checkbox id to checkedSymptoms array if checked,
  // else removes the id from the list if unchecked
  const handleSymptomChange = (id, isChecked) => {
    if (isChecked) {
      setCheckedSymptoms([...checkedSymptoms, id]);
    } else {
      setCheckedSymptoms(checkedSymptoms.filter(symptomId => symptomId !== id));
    }
  };
  

  const handleNoSymptomsChange = (checked) => {
    setNoSymptomsChecked(checked);
    if (checked) {
      setCheckedSymptoms([]);
    }
  };

  return (
    <GetSymptoms
      checkedSymptoms={checkedSymptoms}
      noSymptomsChecked={noSymptomsChecked}
      handleSymptomChange={handleSymptomChange}
      handleNoSymptomsChange={handleNoSymptomsChange}
    />
  );
}

export default SymptomsList;

