import { Flex, Heading } from "@chakra-ui/layout";
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <Flex bg="teal.300" height="3em" alignItems="center">
      <Heading size="lg">ABlog</Heading>
    </Flex>
  );
};
