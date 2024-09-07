// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SignInPage.css';

// const SignInPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [loginType, setLoginType] = useState('student');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.post('http://localhost:5078/api/Authentication/signin', {
//                 Username: username,
//                 Password: password,
//                 Role: loginType
//             });

//             const { RedirectUrl } = response.data;

//             if (RedirectUrl) {
//                 navigate(RedirectUrl);
//             } else {
//                 alert('Invalid username or password');
//             }
//         } catch (error) {
//             console.error('Error during sign in:', error);
//             alert('An error occurred during sign in.');
//         }
//     };

//     const handleNewUser = () => {
//         navigate('/student-new-user');
//     };

//     return (
//         <div className="container">
//             <div className="form-wrapper">
//                 <h1>Sign In</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="username">Username or Email:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />

//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />

//                     <label htmlFor="loginType">Login As:</label>
//                     <select
//                         id="loginType"
//                         value={loginType}
//                         onChange={(e) => setLoginType(e.target.value)}
//                     >
//                         <option value="student">Student Login</option>
//                         <option value="trainee">Trainee Login</option>
//                         <option value="admin">Admin Login</option>
//                     </select>

//                     <button type="submit">Submit</button>
//                 </form>
//                 <button id="newUser" onClick={handleNewUser}>New User</button>
//             </div>
//         </div>
//     );
// };

// export default SignInPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.css';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('student'); // default set to 'student'
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5078/api/Authentication/signin', {
                Username: username,
                Password: password,
                Role: loginType
            });

            const { id, redirectUrl } = response.data; // Assuming backend sends back the user ID and redirect URL

            if (redirectUrl && loginType === 'student') {
                navigate(`/studentDashboard/${id}`);
            } else if (redirectUrl && loginType === 'trainee') {
                navigate(`/traineeDashboard/${id}`);
            } else if (redirectUrl) {
                navigate(redirectUrl);
            } else {
                alert('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            alert('An error occurred during sign-in.');
        }
    };

    const handleNewUser = () => {
        if (loginType === 'student') {
            navigate('/student-new-user');
        } else if (loginType === 'trainee') {
            navigate('/trainee-new-user');
        } else if (loginType === 'admin') {
            navigate('/admin-new-user');
        }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username or Email:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="loginType">Login As:</label>
                    <select
                        id="loginType"
                        value={loginType}
                        onChange={(e) => setLoginType(e.target.value)}
                    >
                        <option value="student">Student Login</option>
                        <option value="trainee">Trainee Login</option>
                        <option value="admin">Admin Login</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
                <button id="newUser" onClick={handleNewUser}>New User</button>
            </div>
        </div>
    );
};

export default SignInPage;



