import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
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
      </Box>
    </Flex>
  );
};
