import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, Navigate } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";
import { useAuth } from "../contexts/auth";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, user } = useAuth();
  const toast = useToast();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    e.persist();
    setIsLoading(true);
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    try {
      await register(
        formData.username.toString(),
        formData.email.toString(),
        formData.password.toString()
      );
    } catch (e) {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <chakra.form onSubmit={signupHandler}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" name="username" type="text" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input id="email" name="email" type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={1}>
                <Stack direction={["row"]} justify="center">
                  <Text>Already a user?</Text>
                  <Link to="/login">
                    <Text color={"blue.400"}>Login</Text>
                  </Link>
                </Stack>
              </Stack>
            </chakra.form>
          </Stack>
          <Stack py={2}>
            <Flex align="center">
              <Divider />
              <Text padding="2">OR</Text>
              <Divider />
            </Flex>
          </Stack>
          <GoogleAuth />
        </Box>
      </Stack>
    </Flex>
  );
};
