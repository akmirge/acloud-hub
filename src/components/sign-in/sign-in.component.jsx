import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import './sign-in.styles.scss';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = this.state;
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({
				email: '',
				password: ''
			});
		} catch (error) {
			console.log('Error Signing In.', error.message);
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		return (
			<div className='sign-in'>
				<h1>I already have an account.</h1>
				<span>Sign in with your email and password.</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						label='Email'
						type='email'
						name='email'
						value={this.state.email}
						required
						handleChange={this.handleChange}
					/>
					<FormInput
						label='Password'
						type='password'
						name='password'
						value={this.state.password}
						required
						handleChange={this.handleChange}
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
							Sign in with google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}

export default SignIn;
