import { Flex, useColorModeValue, Stack } from "@chakra-ui/react";
import { EditProfile } from "./EditProfile";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";

export const Home = () => {
  return (
    <Navbar>
      <Stack
        direction={["column", "row"]}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Profile />
        <EditProfile />
      </Stack>
    </Navbar>
  );
};
