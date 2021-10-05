import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

function NavBar() {
  let history = useHistory();
  return (
    <Flex padding="2" boxShadow="md">
      <Box p="2">
        <Heading size="md" color="teal">
          Wealth-A-Lot.
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Button
          onClick={() => history.push('/register')}
          colorScheme="teal"
          mr="4"
        >
          Sign Up
        </Button>
        <Button onClick={() => history.push('/login')} colorScheme="teal">
          Log in
        </Button>
      </Box>
    </Flex>
  );
}

export default NavBar;
