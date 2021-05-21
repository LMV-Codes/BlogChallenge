import { Button } from "@chakra-ui/button";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { AxiosApi } from "../utils/AxiosApi";
import { PostData } from "../utils/CustomInterfaces";

interface UrlId {
  id: string;
}

export const PostDetail: React.FC = () => {
  const history = useHistory();
  const checkLogin = () => {
    if (localStorage.getItem("token") !== null) {
      history.push("/login");
    }
  };

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            textTransform="uppercase"
            size="lg"
            textAlign="center"
            fontWeight="regular"
            marginTop="1em"
          >
            {post?.title}
          </Heading>
          <Text marginTop="2em">{post?.body}</Text>
        </Flex>
      )}
      <Link to="/">
        <Button
          variant="outline"
          colorScheme="blue"
          marginTop="1em"
          leftIcon={<ArrowBackIcon />}
        >
          Go back to posts
        </Button>
      </Link>
    </Container>
  );
};
