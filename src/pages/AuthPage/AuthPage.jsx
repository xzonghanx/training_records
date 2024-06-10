import { useState } from "react";
import LoginForm from "../../../src/components/LoginForm/LoginForm";
// import SignUpForm from "../../../src/components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
	const [showPassword, setShowPassword] = useState(false);

	const togglePW = () => {
		setShowPassword(!showPassword);
	};

	return (
		<>
			<LoginForm setUser={setUser} showPassword={showPassword} togglePW={togglePW} />
			{/* <SignUpForm setUser={setUser} /> */}
		</>
	);
}
