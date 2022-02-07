import { Box, Button, Flex, Link } from '@chakra-ui/react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'

import NextLink from 'next/link'
import React from 'react'
import { isServer } from '../utils/isServer'

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
	const [{ data, fetching }] = useMeQuery({
		pause: isServer(),
	})

	let body = null
	console.log(data!)
	console.log(fetching)
	if (fetching) {
	} else if (!data?.me) {
		body = (
			<>
				<NextLink href="/login">
					<Link mr={2}>Login</Link>
				</NextLink>
				<NextLink href="/register">
					<Link>Register</Link>
				</NextLink>
			</>
		)
	} else {
		console.log(data.me)
		body = (
			<Flex>
				<Box mr={2}>{data.me.username}</Box>
				<Button
					onClick={() => {
						logout()
					}}
					isLoading={logoutFetching}
					variant="link"
				>
					logout
				</Button>
			</Flex>
		)
	}
	return (
		<Flex bg="tan" p={4}>
			<Box ml={'auto'}>{body}</Box>
		</Flex>
	)
}
