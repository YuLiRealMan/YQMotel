import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomeOptionPage = () => {
  return (
    <Container maxW="container.xl" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={8} align="center">
        <Text
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Welcome to the Hotel App
        </Text>

        {/* Options Container */}
        <VStack spacing={4} align="center">
          <Link to="/checkin">
            <Button colorScheme="blue" size="lg" width="200px">
              Check In
            </Button>
          </Link>
          <Link to="/checkout">
            <Button colorScheme="blue" size="lg" width="200px">
              Check Out
            </Button>
          </Link>
          <Button colorScheme="blue" size="lg" width="200px">
            Settings
          </Button>
          <Button colorScheme="blue" size="lg" width="200px">
            Another Option
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default HomeOptionPage;
