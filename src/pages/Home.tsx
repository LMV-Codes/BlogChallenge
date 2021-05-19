import React, { useCallback, useEffect, useState } from "react";
import { Container, Flex, useToast } from "@chakra-ui/react";
import { PostData } from "../utils/CustomInterfaces";
import { AxiosApi } from "../utils/AxiosApi";
import { Post } from "../components/post/Post";
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
          <Post post={post} posts={posts} index={index} setPosts={setPosts} />
        ))}
      </Flex>
    </Container>
  );
};
