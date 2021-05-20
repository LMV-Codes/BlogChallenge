import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Icon from "@chakra-ui/icon";
import { FaUser } from "react-icons/fa";

interface NavbarProps {
  userData: string | null;
  setUserData: Function;
}

interface decodedUser {
  sub: number;
  email: string;
  iat: number;
}

export const Navbar: React.FC<NavbarProps> = ({ userData, setUserData }) => {
  const history = useHistory();

  const checkIfLoggedIn = () => {
    if (localStorage.getItem("token") === null) {
      history.push("/login");
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserData("");
  };

  const decodeToken = () => {
    if (userData !== "" && userData !== null) {
      const decodedUser: decodedUser = jwt_decode(userData);
      return decodedUser.email;
    }
  };

  return (
    <Flex bg="blue.600" color="white" height="4em" alignItems="center">
      <Link to="/">
        <Heading
          fontFamily="Roboto Condensed"
          fontWeight="bold"
          size="lg"
          marginLeft="1em"
          _hover={{ color: "yellow.400", transition: "0.3s" }}
        >
          AlkeBlog
        </Heading>
      </Link>
      <Box marginLeft="auto" marginRight="1em">
        {userData ? (
          <Flex alignItems="center">
            <Icon as={FaUser} marginRight="0.3em" fontSize="0.7em" />
            <Text
              marginRight="1em"
              fontFamily="Roboto Condensed"
              fontSize="0.6em"
            >
              {decodeToken()}
            </Text>
            <Button
              variant="outline"
              colorScheme="orange"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Flex>
        ) : (
          <Link to="/login">
            <Button
              variant="outline"
              _hover={{
                color: "yellow.400",
                borderColor: "yellow.400",
                transition: "0.3",
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
};
