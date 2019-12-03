import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert("passwords don't match, please try again!");
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			//displayName is sent as an object with name:value instead of just as a string
			await createUserProfileDocument(user, { displayName });
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className='sign-up'>
				<h1 className='title'>I do not have an Account</h1>
				<span>Sign up with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						type='text'
						onChange={this.handleChange}
						value={displayName}
						name='displayName'
						label='Display Name'
						required
					/>
					<FormInput
						type='email'
						onChange={this.handleChange}
						value={email}
						name='email'
						label='Email'
						required
					/>
					<FormInput
						type='password'
						onChange={this.handleChange}
						value={password}
						name='password'
						label='Password'
						required
					/>
					<FormInput
						type='password'
						onChange={this.handleChange}
						value={confirmPassword}
						name='confirmPassword'
						label='Confirm Password'
						required
					/>
					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
