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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GoogleAuth } from "./GoogleAuth";

export const Login = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
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
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={1}>
              <Stack direction={["row"]} justify="center">
                <Text>Don't have an account?</Text>
                <Link to="/signup">
                  <Text color={"blue.400"}>Sign Up</Text>
                </Link>
              </Stack>
            </Stack>
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
