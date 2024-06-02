//example of class Component (legacy method)
import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";

const log = debug("mern:components:SignUpForm");

export default class SignUpForm extends Component {
	state = {
		name: "hello",
		email: "",
		password: "",
		confirm: "",
		error: "",
	};

	//need arrow function here for 'this' to not refer to the main Component, but this specific element instead
	handleChange = (event) => {
		const { name, value } = event.target;
		//note that we didnt use spreadoperator in this setState.
		//using 'this.setState' adds on the value rather than replace as in reactHooks
		this.setState({ [name]: value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		//placeholder for fetch req.
		// alert(JSON.stringify(this.state));

		try {
			//dont need to pass the whole state into the form.  delete the object key/values.
			const formData = { ...this.state };
			delete formData.error;
			delete formData.confirm;

			// call signUp from the users-service (express)
			const user = await signUp(formData);
			// then i need to return the user (extracted from the JWT form), and set the user State to true; thereby navigating away from Auth Page.
			log("user: %o", user);
			this.props.setUser(user);
			// localStorage.setItem("token", token) --> moved into users-service to decode in server.
		} catch (error) {
			// reminder that using class Component, 'this.setState' adds on the value rather than replace as in reactHooks
			// we need to use spreadoperators ... when we are using react hooks
			this.setState({ error: "Sign Up Failed" });
		}
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>SignUp</legend>

					<label>
						Name: <input name='name' value={this.state.name} onChange={this.handleChange} />
					</label>
					<br />

					<label>
						Email: <input name='email' value={this.state.email} onChange={this.handleChange} />
					</label>
					<br />

					<label>
						Password: <input name='password' value={this.state.password} onChange={this.handleChange} />
					</label>
					<br />

					<label>
						Confirm: <input name='confirm' value={this.state.confirm} onChange={this.handleChange} />
					</label>
					<br />

					<button>Sign Up</button>
					<p>{this.state.error}</p>
				</fieldset>
			</form>
		);
	}
}
