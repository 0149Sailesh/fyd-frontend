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

function Register() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const toast = useToast();
  const history = useHistory();

  const handlePhoneNumer = (e: any) => setPhoneNumber(e.currentTarget.value);
  const handlePassword = (e: any) => setPassword(e.currentTarget.value);
  const handleRepeatPassword = (e: any) =>
    setRepeatPassword(e.currentTarget.value);
  const handleName = (e: any) => setName(e.currentTarget.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', {
        name: name,
        phone_number: phoneNumber,
        password: password,
        repeat_password: repeatPassword,
      });

      toast(toastCongif('success', 'Registration successfull'));
      history.push('/login');
    } catch (error) {
      const { status, data } = error.response || {};
      if (status && status == 400) {
        toast(toastCongif('error', data.detail));
      } else if (status == 422) {
        toast(toastCongif('warning', data.detail[0].msg));
      } else {
        toast(toastCongif('error', 'something went wrong, try again later'));
      }
    }
  };

  return (
    <>
      <Flex width="full" align="center" justifyContent="center" mt={10}>
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Sign up</Heading>
          </Box>

          <Box my={4} textAlign="left" boxShadow="md">
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

              <FormControl mb={3} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  variant="filled"
                  type="text"
                  onChange={handleName}
                  value={name}
                />
              </FormControl>

              <FormControl mb={3} isRequired>
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

              <FormControl isRequired>
                <FormLabel>Repeat Password</FormLabel>
                <Input
                  variant="filled"
                  type="password"
                  onChange={handleRepeatPassword}
                  value={repeatPassword}
                />
              </FormControl>

              <Button mt={4} width="full" colorScheme="teal" type="submit">
                Sign up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default Register;
