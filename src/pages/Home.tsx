import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Flex, Heading } from "@chakra-ui/react";
import { PostData } from "../utils/CustomInterfaces";

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Array<PostData>>([]);

  const getPostData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <Container maxWidth="container.xl" bg="gray.100">
      <Flex flexDir="column">
        {posts.map((post) => (
          <Flex
            margin="1em"
            flexDir="column"
            bg="gray.200"
            padding="1em"
            borderRadius="5px"
          >
            <Heading size="lg" fontWeight="regular" color="gray.600">
              {post.title}
            </Heading>
            <Flex justifyContent="space-between">
              <Flex>
                <Button variant="outline" margin="1em" colorScheme="blue">
                  Detail
                </Button>
                <Button variant="outline" margin="1em" colorScheme="teal">
                  Edit
                </Button>
              </Flex>
              <Button variant="outline" margin="1em" colorScheme="red">
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};
