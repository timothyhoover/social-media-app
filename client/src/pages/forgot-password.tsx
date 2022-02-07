import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useForgotPasswordMutation } from '../generated/graphql'
import { withUrqlClient } from 'next-urql'

const ForgotPassword: React.FC<{}> = ({}) => {
	const [complete, setComplete] = useState(false)
	const [, forgotPassword] = useForgotPasswordMutation()
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ email: '' }}
				onSubmit={async (values) => {
					await forgotPassword(values)
					setComplete(true)
				}}
			>
				{({ isSubmitting }) =>
					complete ? (
						<Box>
							if an account with that email exists, we sent you an email
						</Box>
					) : (
						<Form>
							<InputField name="email" placeholder="email" label="Email" />
							<Button
								mt={4}
								type="submit"
								isLoading={isSubmitting}
								colorScheme="teal"
								color="white"
							>
								Forgot Password
							</Button>
						</Form>
					)
				}
			</Formik>
		</Wrapper>
	)
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
