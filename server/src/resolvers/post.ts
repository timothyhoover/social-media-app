import { Arg, Query, Resolver, Mutation } from 'type-graphql'
import { Post } from '../entities/Post'

@Resolver()
export class PostResolver {
	// Get all posts
	@Query(() => [Post])
	posts(): Promise<Post[]> {
		return Post.find()
	}

	// Get post by Id
	@Query(() => Post, { nullable: true })
	post(@Arg('id') _id: number): Promise<Post | undefined> {
		return Post.findOne(_id)
	}

	// Create a new post -> Mutation in GraphQL
	@Mutation(() => Post)
	async createPost(
		@Arg('title') title: string,
	): Promise<Post> {
		return Post.create({ title }).save()
	}

	@Mutation(() => Post, { nullable: true })
	async updatePost(
		@Arg('id') _id: number,
		@Arg('title') title: string,
	): Promise<Post | null> {
		const post = await Post.findOne(_id)
		if (!post) {
			return null
		}
		if (typeof title !== 'undefined') {
			post.title = title
			await Post.update({ _id }, { title })
		}
		return post
	}

	@Mutation(() => Boolean)
	async deletePost(
		@Arg('id') _id: number,
	): Promise<boolean> {
		await Post.delete(_id)
		return true
	}
}
