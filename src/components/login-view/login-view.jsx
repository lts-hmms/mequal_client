import React, { useState } from 'react';

export function LoginView(props) {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
                e.preventDefault();
                console.log(username, password);
                /* temporary till 3.6 */
                /* Send a request to the server for authentication */
                /* Then call props.onLoggedIn(username) */
                props.onLoggedIn(username);
        };

        return (
                <form>
                        <label>
                                Username:
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                                Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type="submit" onClick={handleSubmit}>
                                Submit
                        </button>
                </form>
        );
}
