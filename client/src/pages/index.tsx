import { NavBar } from '../components/NavBar'
import { createUrqlClient } from '../utils/createUrqlClient'
import { usePostsQuery } from '../generated/graphql'
import { withUrqlClient } from 'next-urql'

const Index = () => {
	const [{ data }] = usePostsQuery()
	return (
		<>
			<NavBar />
			<div>hellow world</div>
			{!data ? (
				<div>loading...</div>
			) : (
				data.posts.map((p) => <div key={p._id}>{p.title}</div>)
			)}
		</>
	)
}

export default withUrqlClient(createUrqlClient)(Index)
