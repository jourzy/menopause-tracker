import React, {useState, useEffect} from 'react';
import axios from 'axios';

// Component created to combine two other components but didn't work.
// Keeping to improve for future iterations
function SymptomsChecklist() {

    const [symptoms, setSymptoms] = useState([]);

    const [checkedItems, setCheckedItems] = useState(    
        symptoms.reduce((acc, symptom) => {
        acc[symptom] = false;
        return acc;
      }, {}));

    useEffect(() => {
    axios.get('http://localhost:8081/symptoms')
    .then(res => setSymptoms(res.data))
    .catch(err => console.log(err));
    }, [])

      // Handle checkbox change
    const handleChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({
        ...checkedItems,
        [name]: checked,
        });
  };

    return(

        <div>
      {symptoms.map((symptom) => (
        <div key={symptom.symptom_id}>
          <label>
            <input
              type="checkbox"
              name={symptom.symptom_description}
              id={symptom.symptom_id}
              checked={checkedItems[symptom]}
              onChange={handleChange}
            />
            {symptom.symptom_description}
          </label>
        </div>
      ))}
    </div>  

    )
}

export default SymptomsChecklist;







