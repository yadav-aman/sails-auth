import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/auth";

export const EditProfile = () => {
  const { user, editProfile } = useAuth();
  const toast = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    try {
      await editProfile(
        formData.name.toString(),
        formData.bio.toString(),
        formData.picture.toString()
      );
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated",
        status: "success",
      });
    } catch (e) {
      toast({
        title: "An error occurred.",
        description: e.message,
        status: "error",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      minW={"50%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Edit Your Profile
        </Heading>
        <chakra.form onSubmit={handleSubmit}>
          <FormControl id="name">
            <FormLabel>Full Name</FormLabel>
            <Stack direction={["column", "row"]} spacing={2}>
              <Input
                placeholder="Full Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
                defaultValue={user.name}
                name="name"
              />
            </Stack>
          </FormControl>
          <FormControl id="Bio">
            <FormLabel>Bio</FormLabel>
            <Stack direction={["column", "row"]} spacing={2}>
              <Textarea
                placeholder="Bio"
                _placeholder={{ color: "gray.500" }}
                type="text"
                defaultValue={user.bio}
                name="bio"
              />
            </Stack>
          </FormControl>
          <FormControl id="picture">
            <FormLabel>Profile Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={2}>
              <Input
                placeholder="Profile picture URL"
                _placeholder={{ color: "gray.500" }}
                type="text"
                defaultValue={user.picture}
                name="picture"
              />
            </Stack>
          </FormControl>
          <Button minW={"full"} my="4" colorScheme="teal" type="submit">
            Edit
          </Button>
        </chakra.form>
      </Stack>
    </Flex>
  );
};
