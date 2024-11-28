import Header from "../components/Header";
import LogSymptoms from "../components/LogSymptoms";
import {useEffect, useState} from "react";
import CalendarView from '../components/CalendarView';
import MenopauseTips from '../components/MenopauseTips';


function Dashboard () {

    const [showLogSymptoms, setShowLogSymptoms] = useState(false);

    useEffect(() => {
        setShowLogSymptoms(true);
    }, []) 

    const closeLogSymptoms = () => {
        setShowLogSymptoms(false);
    }

    return (
        <div>
            <div>
                <Header/>
            </div>
            <br/>
            
            <LogSymptoms 
                show={showLogSymptoms} 
                closeLogSymptoms={closeLogSymptoms} 
            />
            <CalendarView />
            <div className="App">
              <MenopauseTips />
            </div>
        </div>
    )
}

export default Dashboard;