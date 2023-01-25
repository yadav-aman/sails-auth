import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Divider,
  useColorModeValue,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { GoogleAuth } from "./GoogleAuth";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const colorBg = useColorModeValue("gray.50", "gray.800");
  const colorBox = useColorModeValue("white", "gray.700");

  if (user) {
    return <Navigate to="/" replace />;
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    e.persist();
    setIsLoading(true);
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    try {
      await login(
        formData.emailOrUsername.toString(),
        formData.password.toString()
      );
      navigate("/");
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
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={colorBg}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={colorBox} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <chakra.form onSubmit={loginHandler}>
              <FormControl id="emailOrUsername" isRequired>
                <FormLabel>Email or Username</FormLabel>
                <Input name="emailOrUsername" type="text" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  {/* <Checkbox>Remember me</Checkbox> */}
                  {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={1}>
                <Stack direction={["row"]} justify="center">
                  <Text>Don&apos;t have an account?</Text>
                  <Link to="/signup">
                    <Text color={"blue.400"}>Sign Up</Text>
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
