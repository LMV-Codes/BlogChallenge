import { Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AxiosApi } from "../utils/AxiosApi";
import { PostData } from "../utils/CustomInterfaces";

interface UrlId {
  id: string;
}

export const PostDetail: React.FC = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const { id } = useParams<UrlId>();
  const toast = useToast();
  const getPostData = useCallback(async () => {
    try {
      const response = await AxiosApi.get(`${id}`);
      setPost(response.data);
    } catch (error) {
      toast({
        title: "Post not found",
        description: "Sorry, we can't find that post",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  }, [toast, id]);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  return (
    <Container maxWidth="container.xl" bg="gray.200" minHeight="100vh">
      {post === null ? (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" color="blue.300" />
        </Flex>
      ) : (
        <Flex flexDir="column">
          <Heading
            size="lg"
            textAlign="center"
            fontWeight="regular"
            marginTop="1em"
          >
            {post?.title}
          </Heading>
          <Text>{post?.body}</Text>
        </Flex>
      )}
    </Container>
  );
};
