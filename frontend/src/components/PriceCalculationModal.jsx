import React, { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormLabel,
  Input,
  Checkbox,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

const PriceCalculationModal = ({ room, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [numPets, setNumPets] = useState("");
  const [numChildren, setNumChildren] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);
  const [depositPaid, setDepositPaid] = useState(false);
  const [breakdown, setBreakdown] = useState([]);

  const toast = useToast();

  const calculatePrice = () => {
    let total = room.base_rate;
    const guests = parseInt(numGuests) || 0;
    const pets = parseInt(numPets) || 0;
    const kids = parseInt(numChildren) || 0;

    const breakdownList = [`Base rate: $${room.base_rate}`];

    if (guests > 2) {
      const extraGuestFee = (guests - 2) * 10;
      total += extraGuestFee;
      breakdownList.push(`Extra guests (${guests - 2}): $${extraGuestFee}`);
    }

    if (pets > 0) {
      const petFee = pets * 10;
      total += petFee;
      breakdownList.push(`Pets (${pets}): $${petFee}`);
    }

    if (kids > 0) {
      const kidFee = kids * 5;
      total += kidFee;
      breakdownList.push(`Children (${kids}): $${kidFee}`);
    }

    if (depositPaid) {
      total += 100;
      breakdownList.push(`Deposit: $100`);
    }

    setFinalPrice(total);
    setBreakdown(breakdownList);
    setHasCalculated(true);
  };

  const handleConfirm = () => {
    onClose();
    toast({
      title: "Selection Confirmed",
      description: `Name: ${name}, Phone: ${phone}, Guests: ${numGuests}, Pets: ${numPets}, Children: ${numChildren}, Deposit Paid: ${
        depositPaid ? "Yes" : "No"
      }, Price: $${finalPrice}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Guest Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box>
              <FormLabel>Phone Number</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Box>
            <Box>
              <FormLabel>Number of Guests</FormLabel>
              <Input
                type="number"
                value={numGuests}
                onChange={(e) => setNumGuests(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Number of Pets</FormLabel>
              <Input
                type="number"
                value={numPets}
                onChange={(e) => setNumPets(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Number of Children</FormLabel>
              <Input
                type="number"
                value={numChildren}
                onChange={(e) => setNumChildren(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>Deposit</FormLabel>
              <Checkbox
                isChecked={depositPaid}
                onChange={() => setDepositPaid(!depositPaid)}
              >
                $100 deposit
              </Checkbox>
            </Box>

            <Button colorScheme="green" onClick={calculatePrice}>
              Calculate Price
            </Button>

            {hasCalculated && (
              <Box>
                <Box fontWeight="bold">Final Price: ${finalPrice}</Box>
                <Box mt={2}>
                  {breakdown.map((item, idx) => (
                    <Box key={idx} fontSize="sm" color="gray.600">
                      • {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PriceCalculationModal;
