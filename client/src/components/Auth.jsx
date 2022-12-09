import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
	fullName: '',
	username: '',
	password: '',
	confirmPassword: '',
	phoneNumber: '',
	avatarURL: '',
};

const Auth = () => {
	const [isSignup, setIsSignup] = useState(true);
	const [form, setForm] = useState(initialState);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { username, password, phoneNumber, avatarURL } = form;

		const url = 'http://localhost:5000/auth';

		const {
			data: { fullName, token, userId, hashedPassword },
		} = await axios.post(`${url}/${isSignup ? 'signup' : 'login'}`, {
			username,
			password,
			fullName: form.fullName,
			phoneNumber,
			avatarURL,
		});
		cookies.set('token', token);
		cookies.set('username', username);
		cookies.set('fullName', fullName);
		cookies.set('userId', userId);

		if (isSignup) {
			cookies.set('phoneNumber', phoneNumber);
			cookies.set('avatarURL', avatarURL);
			cookies.set('hashedPassword', hashedPassword);
		}

		window.location.reload();
	};

	const switchMode = () => setIsSignup((prevIsSignup) => !prevIsSignup);

	return (
		<div className='auth__form-container'>
			<div className='auth__form-container_fields'>
				<div className='auth__form-container_fields-content'>
					<p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
					<form onSubmit={handleSubmit}>
						{isSignup && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='fullName'>Full Name</label>
								<input
									type='text'
									name='fullName'
									placeholder='Full Name'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className='auth__form-container_fields-content_input'>
							<label htmlFor='username'>User Name</label>
							<input
								type='text'
								name='username'
								placeholder='User Name'
								onChange={handleChange}
								required
							/>
						</div>
						{isSignup && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='phoneNumber'>Phone Number</label>
								<input
									type='text'
									name='phoneNumber'
									placeholder='Phone Number'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						{isSignup && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='avatarURL'>Avatar URL</label>
								<input
									type='text'
									name='avatarURL'
									placeholder='Avatar URL'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className='auth__form-container_fields-content_input'>
							<label htmlFor='password'>Password</label>
							<input
								type='password'
								name='password'
								placeholder='Password'
								onChange={handleChange}
								required
							/>
						</div>
						{isSignup && (
							<div className='auth__form-container_fields-content_input'>
								<label htmlFor='confirmPassword'>Confrim Password</label>
								<input
									type='password'
									name='confirmPassword'
									placeholder='Confirm Password'
									onChange={handleChange}
									required
								/>
							</div>
						)}
						<div className='auth__form-container_fields-content_button'>
							<button>{isSignup ? 'Sign Up' : 'Sign In'}</button>
						</div>
					</form>
					<div className='auth__form-container_fields-account'>
						<p>
							{isSignup
								? 'Already have an account?'
								: "Don't already have an account?"}
							<span onClick={switchMode}>
								{isSignup ? ' Sign In' : ' Create One'}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className='auth__form-container_image'>
				<img
					src={signinImage}
					alt='Sign In'
				/>
			</div>
		</div>
	);
};

export default Auth;
