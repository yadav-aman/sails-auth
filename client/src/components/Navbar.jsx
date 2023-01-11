import {
  chakra,
  Flex,
  useColorModeValue,
  HStack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const Navbar = ({ children }) => {
  const bg = useColorModeValue("white", "gray.800");
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
      });
    }
  };

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
                {/* <Button colorScheme="teal" variant="outline">
                  <Link to="/edit">Edit Profile</Link>
                </Button> */}
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={logoutHandler}
                >
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
