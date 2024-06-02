import LoginForm from "../../../src/components/LoginForm/LoginForm";
import SignUpForm from "../../../src/components/SignUpForm/SignUpForm";

export default function AuthPage({ setUser }) {
	return (
		<>
			<LoginForm setUser={setUser} />
			<SignUpForm setUser={setUser} />
		</>
	);
}
