import React from "react";

import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ children }) => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <>
      <Fragment>
        <chakra.header
          bg={bg}
          w="full"
          px={{ base: 2, sm: 4 }}
          py={4}
          shadow="md"
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <Flex>
              <Link to="/">
                <Heading
                  fontSize="xl"
                  fontWeight="extrabold"
                  mx="2"
                  color="teal"
                >
                  Home
                </Heading>
              </Link>
            </Flex>
            <HStack display="flex" alignItems="center" spacing={1}>
              <HStack spacing={1} mr={1} color="brand.500">
                <Button colorScheme="blue" variant="outline">
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button colorScheme="blue" variant="outline">
                  <Link to="/signup">Sign up</Link>
                </Button>
                <Button colorScheme="red" variant="outline">
                  Sign out
                </Button>
              </HStack>
            </HStack>
          </Flex>
        </chakra.header>
      </Fragment>
      {children}
    </>
  );
};
