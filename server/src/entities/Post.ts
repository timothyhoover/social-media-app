import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	_id!: number

	@Field(() => String)
	@CreateDateColumn()
	createdAt = Date

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt = Date

	@Field()
	@Column()
	title!: string
}
