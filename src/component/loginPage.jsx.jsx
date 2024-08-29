import React, { useState } from 'react';

function LoginPage() {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();     

        const username = event.target.username.value;
        const password = event.target.password.value;

        if (username === 'user' && password === 'password') {
            setMessage('Welcome, user!');
            setIsLoggedIn(true); 
        } else {
            setMessage('Invalid username or password');
            setIsLoggedIn(false); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            
            {!isLoggedIn && ( 
                <>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Username" required />
                    </div>
                    
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" required />
                    </div>
                    
                    <button type="submit">Submit</button>
                </>
            )}
            
            {message && <p>{message}</p>}
        </form>
    );
}

export default LoginPage;
