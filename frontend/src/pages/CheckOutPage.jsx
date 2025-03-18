const CheckOutPage = () => {
    const [checkOutDate, setCheckOutDate] = useState(new Date());
  
    const handleSubmit = () => {
      console.log({ checkOutDate });
    };
  
    return (
      <Container maxW="container.sm" py={8}>
        <VStack spacing={6} align="center">
          <Text fontSize="2xl" fontWeight="bold">Check Out</Text>
  
          <Box w="full">
            <FormControl>
              <FormLabel>Check Out Date</FormLabel>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                dateFormat="MMMM d, yyyy"
                className="chakra-input"
                isClearable
              />
            </FormControl>
          </Box>
  
          <Button colorScheme="blue" onClick={handleSubmit} size="lg" width="full">
            Confirm Check Out
          </Button>
        </VStack>
      </Container>
    );
  };
export default CheckOutPage;