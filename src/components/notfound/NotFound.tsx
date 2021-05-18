import { Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
  return (
    <Flex flexDirection="column" textAlign="center" marginTop="5em">
      <Heading>404 - Page not found</Heading>
      <Text>Sorry the page you're trying to reach doesn't exist</Text>
      <Link to="/">click here to go back to homepage</Link>
    </Flex>
  );
};
