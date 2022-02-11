import { Box, Button } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import React, { useEffect } from 'react'
import { useCreatePostMutation, useMeQuery } from "../generated/graphql"

import { InputField } from "../components/InputField"
import { Layout } from "../components/Layout"
import { createUrqlClient } from "../utils/createUrqlClient"
import { useIsAuth } from "../utils/useIsAuth"
import { useRouter } from "next/router"
import { withUrqlClient } from "next-urql"

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter()
  useIsAuth()
  const [, createPost] = useCreatePostMutation()
    return (
      <Layout variant="small">
        <Formik
				initialValues={{ title: '', text: '' }}
				onSubmit={async (values) => {
          const { error } = await createPost({ input: values})
          if (!error) {
            router.push('/')
          }
          console.log('error')
          console.log(error)
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<InputField
							name="title"
							placeholder="title"
							label="title"
						/>
						<Box mt={4}>
							<InputField
                textarea
								name="text"
								placeholder="text"
								label="text"
							/>
						</Box>
						<Button
							mt={4}
							type="submit"
							isLoading={isSubmitting}
							colorScheme="teal"
							color="white"
						>
							Create Post
						</Button>
					</Form>
				)}
			</Formik>
      </Layout>
    );
}

export default withUrqlClient(createUrqlClient)(CreatePost)