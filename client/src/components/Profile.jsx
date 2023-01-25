import {
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const Profile = ({ user }) => {
  return (
    <Flex
      minH={"100vh"}
      minW={"50%"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} justify={"center"} align={"center"}>
            <Image
              objectFit="cover"
              boxSize="100%"
              borderRadius="3xl"
              src={user.picture}
              fallbackSrc={`https://api.dicebear.com/5.x/identicon/svg?seed=${user.username}}`}
              referrerPolicy="no-referrer"
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {user.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              @{user.username}
            </Text>
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              {user.bio}
            </Text>
          </Stack>
        </Stack>
      </Center>
    </Flex>
  );
};
