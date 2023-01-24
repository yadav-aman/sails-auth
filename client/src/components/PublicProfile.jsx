import { Button, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../utils/consts";
import { NotFound } from "./NotFound";
import { Profile } from "./Profile";

export const PublicProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${username}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setUser(data);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <NotFound />;
  }
  return (
    <Stack>
      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
      >
        <Link to="/">Go to Home</Link>
      </Button>
      <Profile user={user} />
    </Stack>
  );
};
