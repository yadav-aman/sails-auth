import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export const GoogleAuth = () => {
  return (
    <Stack>
      <Button
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Stack>
  );
};
