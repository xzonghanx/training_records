import { login } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

// import debug from "debug";
// const log = debug("pern:components:LoginForm");

export default function LoginForm({ setUser }) {
	const navigate = useNavigate();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const formData = new FormData(evt.target);
		const data = Object.fromEntries(formData);
		// log("data %o:", data);
		const { email, password } = data;
		const user = await login(email, password);
		setUser(user);
		navigate("/personnel");
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>Login</legend>

				<label>
					Email: <input name='email' />
				</label>
				<br />

				<label>
					Password: <input name='password' />
				</label>
				<br />

				<button>Login</button>
			</fieldset>
		</form>
	);
}
