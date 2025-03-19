import React from "react";
import { Box, Heading, Text, Button, HStack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import PriceCalculationModal from "./PriceCalculationModal";

const RoomCard = ({ room }) => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Use disclosure hook here
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
      p={4}
    >
      <Heading as="h3" size="md" mb={2}>
        Room #{room.room_number}
      </Heading>
      <Text color={textColor}>Type: {room.room_type}</Text>
      <Text color={textColor}>Beds: {room.bed_count}</Text>
      <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
        Base Rate: ${room.base_rate}
      </Text>

      <HStack spacing={2}>
        <Button onClick={onOpen} colorScheme="teal"> {/* Use onOpen here */}
          Select
        </Button>
      </HStack>

      {/* Pass onOpen and onClose to the modal */}
      <PriceCalculationModal room={room} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default RoomCard;
