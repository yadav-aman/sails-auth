import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../contexts/auth";

export const GoogleAuth = () => {
  const { googleAuth } = useAuth();

  return (
    <Stack>
      <Button
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
        onClick={googleAuth}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Stack>
  );
};
