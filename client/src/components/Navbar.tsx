import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,// Import Button for logout
  useDisclosure,
  useColorModeValue,
  Stack,
  Link as ChakraLink,
  Text,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';// Use navigate for redirecting after logout
import { Link as RouterLink, useNavigate } from 'react-router-dom';//Use navigate for redirecting after logout
import { useAuth } from '../context/authContext';



const NavLink = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <ChakraLink
    
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children}
  </ChakraLink>
);

const NavBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();//  Added navigate function for redirecting after logout

  //const { user } = useAuth();
  const { user, logoutUser } = useAuth(); // james: Access user data and logout function from the auth context
  const handleLogout = () => { // james: Function to handle user logout
    logoutUser(); // james: Log out the user
    navigate('/sign_in'); // james: Redirect to the sign-in page after logout
  };


  const Links = !user ? [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ] : [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Groups', path: '/groups' },
    { label: 'Profile', path: '/profile' },
  ];


  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box
            onClick={() => navigate("/")}
            cursor="pointer"
          ><Heading size="md">Grouped</Heading></Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.label} to={link.path}>{link.label}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {/*{ user ? <Text cursor="pointer" onClick={() => navigate('/profile')}><i className="fa-solid fa-user"></i> {user.username}</Text> :
                <Button
                onClick={() => navigate("/sign_in")}
                _hover={{color: "purple"}}
                variant={'solid'}
                colorScheme={'purple'}
                size={'sm'}>
                Log in
            </Button>
            }*/}
          { user ? (
                  <>
                    <Text cursor="pointer" onClick={() => navigate('/profile')}><i className="fa-solid fa-user"></i> {user.username}</Text>
                    <Box mx={2}></Box> {/* james: Add space between username and logout button */}
                    <Button colorScheme="red" size="sm" onClick={handleLogout}>
                      Logout
                    </Button> {/* james: Added Logout button next to username */}
                  </>
              ) :
              <Button
                  onClick={() => navigate("/sign_in")}
                  _hover={{color: "purple"}}
                  variant={'solid'}
                  colorScheme={'purple'}
                  size={'sm'}>
                Log in
              </Button>
          }


        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.label} to={link.path}>{link.label}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
