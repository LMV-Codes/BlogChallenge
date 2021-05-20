import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Flex, Spinner, useToast } from "@chakra-ui/react";
import { PostData } from "../utils/CustomInterfaces";
import { AxiosApi } from "../utils/AxiosApi";
import { Post } from "../components/post/Post";
import { AddIcon } from "@chakra-ui/icons";
import { PostCreate } from "../components/post/PostCreate";
export const Home: React.FC = () => {
  const toast = useToast();

  const [posts, setPosts] = useState<Array<PostData>>([]);
  const [createPost, setCreatePost] = useState(false);
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
      {createPost && (
        <PostCreate
          setCreate={setCreatePost}
          setPosts={setPosts}
          posts={posts}
        />
      )}
      {posts.length !== 0 ? (
        <Flex flexDir="column">
          {posts.map((post, index) => (
            <Post
              post={post}
              posts={posts}
              index={index}
              setPosts={setPosts}
              key={index}
            />
          ))}
          <Flex justifyContent="center" marginBottom="2em">
            <Button
              textTransform="uppercase"
              variant="outline"
              onClick={() => setCreatePost(true)}
              colorScheme="green"
              rightIcon={<AddIcon />}
            >
              Create post
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="center" minHeight="50vh" alignItems="center">
          <Spinner size="xl" color="blue.300" />
        </Flex>
      )}
    </Container>
  );
};
