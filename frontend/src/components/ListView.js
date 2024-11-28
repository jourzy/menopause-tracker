import React from 'react';
import NoSymptoms from './NoSymptoms';
import RenderUserSymptoms from './RenderUserSymptoms'

// Component that renders inside CalendarView component
// If there are symptoms logged for the selected date, 
//  this component conditionally renders the RenderUserSymptoms component,
//  otherwise the NoSymptoms component is rendered
function ListView({symptoms, selectedDate}) {

    return (
        <div>
            { symptoms.length > 0 ? <RenderUserSymptoms 
                                    symptoms={symptoms} 
                                    selectedDate={selectedDate}
                                    /> : <NoSymptoms/> }          
        </div>

    )
}

export default ListView;