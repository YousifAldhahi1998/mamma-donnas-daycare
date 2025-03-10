// libraries
import { useCollection }       from "../../hooks/useCollection";
import { timestamp }           from "../../firebase/config";
import { useFirestore }        from '../../hooks/useFirestore'
import { useState, useEffect } from 'react'

// components
import Avatar from '../../components/Avatar'

// styles
import './Display.css'

export default function DisplayBreathing() {
    const [time, setTime] = useState('')
    const { documents, error }         = useCollection('guardianinfo');
    const { updateDocument, response } = useFirestore('guardianinfo')
    const { addDocument, response2 }   = useFirestore('BreathingCheckLog')

    //  The filter is used to filter by age
    const all = documents ? documents.filter((p) => {
        
        if( (p.breathingCheck == 'yes' | p.breathingCheck == 'Yes' | p.breathingCheck == 'YES') && p.status == 'in')  {
            return true
        }
    }) : null

    const handleSubmit = async (uid) => {
        const students = all.map((s) => {
            if(uid == s.uid) {
               addDocument({
                    uid: uid,
                    breathingCheckedAt: timestamp.fromDate(new Date()),
                    childFirstName: s.childFirstName,
                    childLastName: s.childLastName,
                    guardianFirstName1: s.guardianFirstName1,
                    guardianLastName1: s.guardianLastName1,
                    guardianPhone1: s.guardianPhone1,
                    })
                updateDocument(s.id, {breathingCheckedAt: timestamp.fromDate(new Date())})
                alert("Breathing Check has been logged for: " + s.childFirstName)
            }
        })
        
    } 
   
    return(
        <div >
            <h1>Breathing Checks</h1>
            {all && all.map(student => (
                <div key={student.id} className="user-list-item">
                    <span>{student.childFirstName}</span>
                    <Avatar src={student.photoUrl} />
                    <div>
                        <button className='btn' onClick={() =>{handleSubmit(student.uid)}}>Breathing Check</button>
                    </div>
                    
                </div>
            ))}
            </div>
    )
}