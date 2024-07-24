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
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
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
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}>
        <Heading size="md">Grouped</Heading>
        <Stack direction={'row'} spacing={6}>
          <RouterLink to={'/'}>Home</RouterLink>
          <RouterLink to={'#'}>About</RouterLink>
          <RouterLink to={'#'}>Services</RouterLink>
          <RouterLink to={'#'}>Contact</RouterLink>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
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
            <SocialButton label={'Twitter'} href={'https://twitter.com'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'https://youtube.com'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://instagram.com'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
