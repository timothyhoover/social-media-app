import { Layout } from "../components/Layout"
import { Link } from "@chakra-ui/react"
import NextLink from 'next/link'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { withUrqlClient } from 'next-urql'

const Index = () => {
	const [{ data }] = usePostsQuery()
	return (
		<Layout>
			<NextLink href={'/create-post'}>
			<Link>create post</Link>
			</NextLink>
			<div>hellow world</div>
			{!data ? (
				<div>loading...</div>
			) : (
				data.posts.map((p) => <div key={p._id}>{p.title}</div>)
			)}
		</Layout>
	)
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
