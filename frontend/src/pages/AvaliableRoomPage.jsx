import { Container, Text, VStack, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRoomStore } from "../store/room";
import RoomCard from "../components/RoomCard";

const HomePage = () => {
  const { fetchRooms, rooms } = useRoomStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Available Rooms 🏨
        </Text>

        {rooms.length > 0 ? (
          rooms.map((room) => (
            <Box key={room._id} w="full" p={4} boxShadow="md" borderRadius="md" borderWidth="1px">
              <RoomCard room={room} />
            </Box>
          ))
        ) : (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No rooms found 😢
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

// import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useRoomStore } from "../store/room";
// import RoomCard from "../components/RoomCard";

// const HomePage = () => {
// 	const { fetchRooms, rooms } = useRoomStore();

// 	useEffect(() => {
// 		fetchRooms();
// 	}, [fetchRooms]);

// 	return (
// 		<Container maxW='container.xl' py={12}>
// 			<VStack spacing={8}>
// 				<Text
// 					fontSize={"30"}
// 					fontWeight={"bold"}
// 					bgGradient={"linear(to-r, cyan.400, blue.500)"}
// 					bgClip={"text"}
// 					textAlign={"center"}
// 				>
// 					Available Rooms 🏨
// 				</Text>

// 				<SimpleGrid
// 					columns={{
// 						base: 1,
// 						md: 2,
// 						lg: 3,
// 					}}
// 					spacing={10}
// 					w={"full"}
// 				>
// 					{rooms.map((room) => (
// 						<RoomCard key={room._id} room={room} />
// 					))}
			
// 				</SimpleGrid>
// 				{rooms.length === 0 && (
// 					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
// 						No rooms found 😢{" "}
// 					</Text>
// 				)}
// 			</VStack>
// 		</Container>
// 	);
// };

// export default HomePage;
