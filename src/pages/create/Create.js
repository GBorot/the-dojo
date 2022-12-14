import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

// styles 
import './Create.css'


const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]
// RENDER : <option value='development'>Development</option>

const Create = () => {
    // USE HISTORY TO REDIRECT
    const history = useHistory()
    // FIRESTORE
    const { addDocument, response } = useFirestore('projects')
    // GET USERS
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([]);
    //GET USER
    const { user } = useAuthContext()

    // FORM FIELDS VALUES
    const [name, setName] = useState('');    
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Please select a project category')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assigne the project to at least one user')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map(u => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        // console.log(name, details, dueDate, category.value, assignedUsers);
        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            createdAt: timestamp.now(),
            assignedUsersList
        }

        // console.log(project);
        await addDocument(project)
        if (!response.error) {
            history.push('/')
        }
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name :</span>
                    <input 
                        required
                        type="text" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details :</span>
                    <textarea 
                        required
                        type="text" 
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Project details :</span>
                    <input 
                        required
                        type="date" 
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>
                <label>
                    <span>Project category :</span>
                    <Select  
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assigned to :</span>
                    <Select
                        onChange={option => setAssignedUsers(option)}
                        options={users}
                        isMulti
                    />
                </label>
                <button className='btn'>Add project</button>

                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    );
}

export default Create;
