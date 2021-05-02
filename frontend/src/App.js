import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginBar from './components/LoginBar';
import Stocks from './components/Stocks';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
	console.log(useAuth0());
	const { isLoading } = useAuth0();

	// const [username, setUsername] = useState('');
	// const [password, setPassword] = useState('');
	// const [user, setUser] = useState();

	// useEffect(() => {
	// 	const loggedInUser = localStorage.getItem('user');
	// 	if (loggedInUser) {
	// 		const foundUser = loggedInUser;
	// 		setUser(foundUser);
	// 	}
	// }, []);

	// // logout the user
	// const handleLogout = () => {
	// 	setUser({});
	// 	setUsername('');
	// 	setPassword('');
	// 	localStorage.clear();
	// };

	// // login the user
	// const handleSubmit = async e => {
	// 	e.preventDefault();
	// 	var formData = new FormData();
	// 	formData.set('username', username);
	// 	formData.set('password', password);
	// 	//const user = { username, password };
	// 	// send the username and password to the server
	// 	const response = await axios
	// 		.post('http://localhost:8000/auth/jwt/login', formData)
	// 		.catch(error => console.log(error));
	// 	// set the state of the user
	// 	setUser(response.data);
	// 	// store the user in localStorage
	// 	localStorage.setItem('user', response.data);
	// 	// get user profile using token

	// 	const profile = await axios
	// 		.get('http://localhost:8000/users/me', {
	// 			headers: {
	// 				Authorization: `Bearer ${localStorage.user}`
	// 			}
	// 		})
	// 		.then(response => console.log(response))
	// 		.catch(err => console.log(err));
	// };

	// // if there's a user show the message below
	// if (user) {
	// 	return (
	// 		<div>
	// 			{user.name} is loggged in
	// 			<button onClick={handleLogout}>logout</button>
	// 		</div>
	// 	);
	// }

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<LoginButton />
			<LogoutButton />
			<Profile />
			<Stocks />

			{/* <div>
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={username}
						placeholder="enter a username"
						onChange={({ target }) => setUsername(target.value)}
					/>
					<div>
						<label htmlFor="password">password: </label>
						<input
							type="password"
							value={password}
							placeholder="enter a password"
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button type="submit">Login</button>
				</form>
			</div> */}
		</>
	);
};

export default App;
