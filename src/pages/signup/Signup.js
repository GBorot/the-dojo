import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// styles
import './Signup.css'

import React from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null);
    const { signup, isPending, error } = useSignup()

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected);

        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }

        if (!selected.type.includes('image')) {
            setThumbnailError('Please select an image')
            return
        }

        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kB')
            return
        }

        setThumbnailError(null)

        setThumbnail(selected)
        console.log('Thumbnail updated');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, displayName, thumbnail);
        signup(email, password, displayName, thumbnail);
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
                <span>email :</span>
                <input 
                    type="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password :</span>
                <input 
                    type="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>display name :</span>
                <input 
                    type="text" 
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>profil thumbnail :</span>
                <input 
                    type="file" 
                    required
                    onChange={handleFileChange}
                />
                {thumbnailError && <div className='error'>{thumbnailError}</div>}
            </label>
            {!isPending && <button className="btn">Sign up</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
}

export default Signup;
