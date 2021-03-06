import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { Form, Formik } from 'formik'

import { InputField } from '../../components/InputField'
import NextLink from 'next/link'
import { NextPage } from 'next'
import { Wrapper } from '../../components/Wrapper'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { toErrorMap } from '../../utils/toErrorMap'
import { useChangePasswordMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { withUrqlClient } from 'next-urql'

const ChangePassword: NextPage = () => {
	const router = useRouter()
	const [, changePassword] = useChangePasswordMutation()
	const [tokenError, setTokenError] = useState('')
	return (
		<Wrapper variant="small">
			<Formik
				initialValues={{ newPassword: '' }}
				onSubmit={async (values, { setErrors }) => {
					const response = await changePassword({
						newPassword: values.newPassword,
						token: typeof router.query.token === 'string' ? router.query.token : '',
					})
					if (response.data?.changePassword.errors) {
						const errorMap = toErrorMap(response.data.changePassword.errors)
						if ('token' in errorMap) {
							setTokenError(errorMap.token)
						}
						setErrors(errorMap)
					} else if (response.data?.changePassword.user) {
						// worked
						router.push('/')
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="newPassword"
							placeholder="new password"
							label="New Password"
							type="password"
						/>
						{tokenError ? (
							<Flex>
								<Box mr={2} style={{ color: 'red' }}>
									{tokenError}
									<NextLink href="/forgot-password">
										<Link>Click here to get a new one</Link>
									</NextLink>
								</Box>
							</Flex>
						) : null}
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							colorScheme="teal"
							color="white"
						>
							Change password
						</Button>
					</Form>
				)}
			</Formik>
		</Wrapper>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword)
