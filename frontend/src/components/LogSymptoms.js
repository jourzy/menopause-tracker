import Modal from "react-modal";
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectDate, selectSubmittedDate, emptySymptoms, addSymptom } from '../redux/userSlice';
import SymptomsList from './SymptomsList';
import '../styles/LogSymptoms.css';
// tried combining GetSymptoms and SymptomsList into one but didn't work
// Keeping for future iterations to imporve codebase
// import SymptomsChecklist from './SymptomsChecklist';


// Modal component that allows users to log their symptoms for the given date
function LogSymptoms ({show, closeLogSymptoms}) {

    const user = useSelector((state) => state.user.userId);
    const selectedDate = useSelector(selectDate);
    const dateToSubmit = useSelector(selectSubmittedDate);
    const dispatch = useDispatch();

    
    // Added to remove console.log error: Warning: react-modal: App element is not defined. 
    useEffect(() => {
        Modal.setAppElement('#root');// Code here will run just like componentDidMount
      }, [])


    // When user submits the data, it adds the user symptoms to the db
    // Also updates the userSymptoms in redux store
    const handleSubmit = (event) => {
        event.preventDefault();
        // getting array of symptom ids to post to db
        const checkedSymptomsById = Array.from(event.currentTarget.elements)
        .filter(el => (el.checked && 
            el.getAttribute('type') === 'checkbox'))
            .map(el => el.id);
        const queryData = {user: user, date: dateToSubmit, symptoms: checkedSymptomsById};
        console.log(queryData);
        // getting array of symptoms descriptions to add to redux store
        const formData = new FormData(event.currentTarget);
        const checkedValues = [];
        for (let [name, value] of formData.entries()) {
            checkedValues.push(name);
          }
        axios.post("http://localhost:8081/user/diary/add", queryData)
        .then(res => {
            console.log(res);
            // console.log(res.data);
        }).catch(err => console.log(err));
        dispatch(emptySymptoms());
        checkedValues.forEach((symptom) => {
            dispatch(addSymptom(symptom))
          })
    }

    return (
        <Modal isOpen={show} 
        onRequestClose={closeLogSymptoms}
        className="log-symptoms-modal">
            <div className="log-symptoms" >
                <div className="log-symptoms-header">
                    <h1>Log your symptoms</h1>
                    <p>{selectedDate.toDateString()}</p>
            </div>
            
                <Form onSubmit={handleSubmit} method="POST">
                
                    <SymptomsList />
                    {/* <SymptomsChecklist /> */}
                    <br/>
                    
            
            <div className="log-symptoms-footer">
                <button type="submit">Save</button>
                <button className="delete-button" onClick={closeLogSymptoms}>Close</button>
            </div>
                </Form>

            </div>
        </Modal>
    )
}

export default LogSymptoms;