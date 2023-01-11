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
} from "@chakra-ui/react";

export const EditProfile = () => {
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
        <FormControl id="name">
          <FormLabel>Full Name</FormLabel>
          <Stack direction={["column", "row"]} spacing={2}>
            <Input
              placeholder="Full Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            <Button colorScheme="teal">Edit</Button>
          </Stack>
        </FormControl>
        <FormControl id="Bio">
          <FormLabel>Bio</FormLabel>
          <Stack direction={["column", "row"]} spacing={2}>
            <Textarea
              placeholder="Bio"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            <Button colorScheme="teal">Edit</Button>
          </Stack>
        </FormControl>
        <FormControl id="profile">
          <FormLabel>Profile Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={2}>
            <Input
              placeholder="Profile picture URL"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            <Button colorScheme="teal">Edit</Button>
          </Stack>
        </FormControl>
      </Stack>
    </Flex>
  );
};
