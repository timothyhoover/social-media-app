import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { InputField } from "../components/InputField";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { useRouter } from "next/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ username: "", password: "" }}
				onSubmit={async (values, { setErrors }) => {
					const response = await register(values);
					if (response.data?.register.errors) {
						setErrors(toErrorMap(response.data.register.errors));
					} else if (response.data?.register.user) {
						// worked
						router.push("/");
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="username"
							placeholder="username"
							label="Username"
						/>
						<Box mt={4}>
							<InputField
								name="password"
								placeholder="password"
								label="Password"
								type="password"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							colorScheme="teal"
							color="white"
						>
							register
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	);
};

export default Register;