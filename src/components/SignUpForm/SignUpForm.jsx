import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import debug from "debug";
const log = debug("pern:components:SignUpForm");

export default class SignUpForm extends Component {
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
		delete formData.error;

		try {
			const user = await signUp(formData);
			log("user: %o", user); //get return from users-service
			this.props.setUser(user);
		} catch (error) {
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
						Password:{" "}
						<input name='password' value={this.state.password} onChange={this.handleChange} />
					</label>
					<br />

					<label>
						Unit: <input name='unit' value={this.state.unit} onChange={this.handleChange} />
					</label>
					<br />

					<label>
						Appointment: <input name='appt' value={this.state.appt} onChange={this.handleChange} />
					</label>
					<br />

					<button>Sign Up</button>
					<p>{this.state.error}</p>
				</fieldset>
			</form>
		);
	}
}
