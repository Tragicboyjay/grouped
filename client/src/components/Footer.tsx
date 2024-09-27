import React from 'react';
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Heading,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const SocialButton = ({
                        children,
                        label,
                        href,
                      }: {
  children: React.ReactNode;
  label: string;
  href: string;
}) => {
  return (
      <chakra.button
          bg={useColorModeValue('whiteAlpha.100', 'blackAlpha.100')}
          rounded={'full'}
          w={8}
          h={8}
          cursor={'pointer'}
          as={'a'}
          href={href}
          display={'inline-flex'}
          alignItems={'center'}
          justifyContent={'center'}
          transition={'background 0.3s ease'}
          _hover={{
            bg: useColorModeValue('whiteAlpha.200', 'blackAlpha.200'),
          }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
  );
};

const Footer: React.FC = () => {
  return (
      <Box
          bg="black"
          color="white">
        <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            spacing={4}
            justify={'center'}
            align={'center'}>
          <Heading size="md" color="white">Grouped</Heading>
          <Stack direction={'row'} spacing={6}>
            <RouterLink to={'/'}>Home</RouterLink>
            <RouterLink to={'/about'}>About</RouterLink>
            <RouterLink to={'/services'}>Services</RouterLink>
            <RouterLink to={'/contact'}>Contact</RouterLink>
          </Stack>
        </Container>

        <Box
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor="gray.700">
          <Container
              as={Stack}
              maxW={'6xl'}
              py={4}
              direction={{ base: 'column', md: 'row' }}
              spacing={4}
              justify={{ base: 'center', md: 'space-between' }}
              align={{ base: 'center', md: 'center' }}>
            <Text>© {new Date().getUTCFullYear()} Grouped. All rights reserved.</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'https://twitter.com/jamesfallouh'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'https://youtube.com/jamesfallouh'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://instagram.com/jamesfallouh'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
  );
};

export default Footer;
