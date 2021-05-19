import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Flex, Heading, useToast } from "@chakra-ui/react";
import { PostData } from "../utils/CustomInterfaces";
import { AxiosApi } from "../utils/AxiosApi";
import { Link } from "react-router-dom";
export const Home: React.FC = () => {
  const toast = useToast();

  const [posts, setPosts] = useState<Array<PostData>>([]);

  const getPostData = useCallback(async () => {
    try {
      const response = await AxiosApi.get("");
      setPosts(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  }, [toast]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <Container maxWidth="container.xl" bg="gray.100">
      <Flex flexDir="column">
        {posts.map((post, index) => (
          <Flex
            key={index}
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
                <Link to={`post/${post.id}`}>
                  <Button variant="outline" margin="1em" colorScheme="blue">
                    Detail
                  </Button>
                </Link>
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
