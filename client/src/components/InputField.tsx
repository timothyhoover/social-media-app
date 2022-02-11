import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";

import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	name: string;
	textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	...props
}) => {
	const InputOrTextArea = textarea ? Textarea as any : Input
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputOrTextArea
				{...field}
				{...props}
				id={field.name}
			/>
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
