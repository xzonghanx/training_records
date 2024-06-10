import { Component } from "react";
import { signUp, getUser } from "../../utilities/users-service";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Input from "../Input/Input";
import debug from "debug";
const log = debug("pern:components:SignUpForm");

export default class SignUpForm extends Component {
	access = getUser();
	state = {
		name: "",
		email: "",
		password: "",
		unit: "",
		appt: "",
		error: "",
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const formData = { ...this.state };
		formData.access = this.access.u_appt;
		delete formData.error;

		try {
			const user = await signUp(formData);
			log("user: %o", user); //get return from users-service
			// this.props.setUser(user);
		} catch (error) {
			this.setState({ error: "Sign Up Failed" });
		}
	};

	render() {
		return (
			<form className='flex min-h-screen items-center justify-center' onSubmit={this.handleSubmit}>
				<fieldset className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5 w-2/6 sm:w-1/3'>
					<legend className='font-black block mb-2 text-sm  text-gray-900'>SignUp</legend>
					<div className='m-0 p-0'>
						<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
							Name:{" "}
							<Input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
						</label>

						<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
							Email:{" "}
							<Input
								type='text'
								name='email'
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</label>
					</div>
					<div className='relative m-0 p-0'>
						<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
							Password:
							<Input
								type={this.props.showPassword ? "text" : "password"}
								name='password'
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</label>
						{this.props.showPassword ? (
							<EyeSlashIcon
								onClick={this.props.togglePW}
								className='w-4 h-4 absolute right-1 top-11'
							/>
						) : (
							<EyeIcon onClick={this.props.togglePW} className='h-4 w-4 absolute right-1 top-11' />
						)}
					</div>
					<div className='m-0 p-0'>
						<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
							Unit:{" "}
							<Input type='text' name='unit' value={this.state.unit} onChange={this.handleChange} />
						</label>

						<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
							Appointment:{" "}
							<Input type='text' name='appt' value={this.state.appt} onChange={this.handleChange} />
						</label>
					</div>
					<button
						type='submit'
						className='ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'>
						Sign Up
					</button>
					<div className='text-red-600'>{this.state.error}</div>
				</fieldset>
			</form>
		);
	}
}
