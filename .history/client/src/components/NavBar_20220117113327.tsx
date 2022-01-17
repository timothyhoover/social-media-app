import { Box, Flex } from "@chakra-ui/react";

import Link from "next/link";
import React from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
	return (
		<Flex bg="tomato" p={4}>
			<Box ml={"auto"}>
				<Link color="white" mr={2}>
					Login
				</Link>
				<Link color="white">Login</Link>
				pretty good
			</Box>
		</Flex>
	);
};
