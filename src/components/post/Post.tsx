import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosApi } from "../../utils/AxiosApi";
import { PostData } from "../../utils/CustomInterfaces";
import { PostEdit } from "./PostEdit";

interface PostProps {
  posts: Array<PostData>;
  setPosts: Function;
  post: PostData;
  index: number;
}

export const Post: React.FC<PostProps> = ({ posts, setPosts, post }) => {
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const deletePost = async (id: number) => {
    try {
      const response = await AxiosApi.delete(`${id}`);
      if (response.status === 200) {
        const newArray = posts.filter((post) => post.id !== id);
        setPosts(newArray);
        toast({
          title: "Post deleted!",
          status: "info",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (error) {
      toast({
        title: "Couldn't remove post",
        status: "error",
        isClosable: true,
        duration: 5000,
      });
    }
  };

  return (
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
          <Link to={`post/${post.id}`}>
            <Button variant="outline" margin="1em" colorScheme="blue">
              Detail
            </Button>
          </Link>
          <Button
            variant="outline"
            margin="1em"
            colorScheme="teal"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        </Flex>
        <Button
          variant="outline"
          margin="1em"
          colorScheme="red"
          onClick={() => deletePost(post.id)}
        >
          Delete
        </Button>
      </Flex>
      {edit && (
        <PostEdit
          data={post}
          setEdit={setEdit}
          setPosts={setPosts}
          posts={posts}
        />
      )}
    </Flex>
  );
};
