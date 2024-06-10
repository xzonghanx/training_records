import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Input from "../Input/Input";
import { login } from "../../utilities/users-service";

// import debug from "debug";
// const log = debug("pern:components:LoginForm");

export default function LoginForm({ setUser, showPassword, togglePW }) {
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const formData = new FormData(evt.target);
		const data = Object.fromEntries(formData);
		// log("data %o:", data);
		const { email, password } = data;
		try {
			const user = await login(email, password);
			setUser(user);
			setError("");
			navigate("/personnel");
		} catch (error) {
			setError("Login Failed - check email & pass");
		}
	};

	return (
		<form className='flex min-h-screen items-center justify-center' onSubmit={handleSubmit}>
			<fieldset className='bg-white bg-opacity-70 border-slate-400 drop-shadow-2xl border-opacity-35 shadow-2xl shadow-neutral-400 rounded-lg flex justify-center flex-col mb-10 space-y-3 p-5'>
				<legend className='font-black block mb-2 text-sm  text-gray-900'>Login</legend>

				{/*<label>
					Email: <input name='email' />
				</label>
				<br />
				 <label>
					Password: <input name='password' />
				</label> */}

				<label className='drop-shadow-sm text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
					Email:
					<Input type='email' name='email' />
				</label>

				<div className='relative'>
					<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col m-5 items-center'>
						Password:
						<Input type={showPassword ? "text" : "password"} name='password' />
						{showPassword ? (
							<EyeSlashIcon onClick={togglePW} className='h-4 w-4 absolute right-1 top-11' />
						) : (
							<EyeIcon onClick={togglePW} className='h-4 w-4 absolute right-1 top-11' />
						)}
					</label>
				</div>
				<br />

				<button
					className='ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
					type='submit'>
					Login
				</button>
				<div className='flex justify-start w-full text-red-600'>{error ? error : ""}</div>
			</fieldset>
		</form>
	);
}
