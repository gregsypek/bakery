import { useState } from "react";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
	const [email, setEmail] = useState("greg@gmail.com");
	const [password, setPassword] = useState("greg123");

	const { login, isLoading } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) return;
		login({ email, password });
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address" orientation="vertical">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password" orientation="vertical">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>
			<FormRow orientation="vertical">
				<Button size="large" disabled={isLoading}>
					{!isLoading ? "Log in" : <SpinnerMini />}
				</Button>
			</FormRow>
		</Form>
	);
}

export default LoginForm;