import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore';

const ProjectComments = ({ project }) => {
    const { updateDocument, response } = useFirestore('projects')
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }

        // console.log(commentToAdd);
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        
        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className='project-comments'>
            <h4>Project comments</h4>

            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment</span>
                    <textarea 
                        required
                        onChange={e => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add comment</button>
            </form>
        </div>
    );
}

export default ProjectComments;