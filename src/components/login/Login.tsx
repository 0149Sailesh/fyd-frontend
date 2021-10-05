import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Flex,
  Box,
  Heading,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { toastCongif } from '../../utils/toast';
import axiosInstance from '../../config/axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const history = useHistory();

  const handlePhoneNumer = (e: any) => setPhoneNumber(e.currentTarget.value);
  const handlePassword = (e: any) => setPassword(e.currentTarget.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        phone_number: phoneNumber,
        password: password,
      });

      const { data } = response as any;
      localStorage.setItem('token', data.token);
      toast(toastCongif('success', data.message));
      history.push('/dashboard');
    } catch (error) {
      const { status, data } = error.response || {};
      if (status && status == 401) {
        toast(toastCongif('error', data ? data.detail : 'invalid credentials'));
      } else {
        toast(toastCongif('error', 'something went wrong, try again later'));
      }
    }
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt={10}>
        <Box p={2} boxShadow="md">
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>

          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl mb={3} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  variant="filled"
                  type="text"
                  onChange={handlePhoneNumer}
                  value={phoneNumber}
                />
                <FormHelperText>
                  Enter your phone number without any spaces or codes
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  variant="filled"
                  type="password"
                  onChange={handlePassword}
                  value={password}
                />
                <FormHelperText>
                  your password should be alteast of length 5
                </FormHelperText>
              </FormControl>

              <Button mt={4} width="full" colorScheme="teal" type="submit">
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Login;
