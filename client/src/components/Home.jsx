import { useColorModeValue, Stack } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { EditProfile } from "./EditProfile";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";

export const Home = () => {
  const { user } = useAuth();
  const color = useColorModeValue("gray.50", "gray.800");
  if (user) {
    return (
      <Navbar>
        <Stack direction={["column", "row"]} bg={color}>
          <Profile user={user} />
          <EditProfile />
        </Stack>
      </Navbar>
    );
  } else {
    <Navigate to="/login" replace />;
  }
};
