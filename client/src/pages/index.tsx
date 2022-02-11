import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react"

import { Layout } from "../components/Layout"
import NextLink from 'next/link'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { useState } from "react"
import { withUrqlClient } from 'next-urql'

const Index = () => {
	const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string})
	const [{ data, fetching }] = usePostsQuery({
		variables: {
			limit: 10
		}
	})

	if (!fetching && !data) {
		return <div>Posts aren't showing for some reason...</div>
	}

	return (
		<Layout>
			<Flex align='center'>
			<Heading>Connex</Heading>
			<NextLink href={'/create-post'}>
			<Link ml='auto'>Create Post</Link>
			</NextLink>
			</Flex>
			<div>hellow world</div>
			{!data ? (
				<div>loading...</div>
			) : (
				<Stack>
				{data.posts.map((p) =>(
				<Box key={p._id} p={5} shadow='md' borderWidth='1px'>
					<Heading fontSize='xl'>{p.title}</Heading>
					<Text mt={4}>{p.textSnippet}...</Text>
				</Box>)
				)}
				</Stack>
			)}
	{fetching && !data ? (
		<div>loading...</div>
	) : (
		<Stack spacing={8}>
			{data!.posts.map((p) => (
				<Box key={p._id} p={5} shadow='md' borderWidth='1px'>
					<Heading fontSize='xl'>{p.title}</Heading>
					<Text mt={4} >{p.textSnippet}</Text>
				</Box>
			))}
		</Stack>
	)}
		{data ? (
			<Flex>
				<Button onClick={() => setVariables({
					limit: variables.limit,
					cursor: data.posts[data.posts.length - 1].createdAt
				})} isLoading={fetching} m='auto' my={8}>
					Load More
				</Button>
			</Flex>
		) : null}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
