import { Button } from "@chakra-ui/button";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { PostData } from "../../utils/CustomInterfaces";
import { AxiosApi } from "../../utils/AxiosApi";
import { CloseIcon } from "@chakra-ui/icons";

interface PostEditProps {
  setPosts: Function;
  setEdit: Function;
  data: PostData;
  posts: Array<PostData>;
}

interface initValues {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostEdit: React.FC<PostEditProps> = ({
  data,
  setEdit,
  setPosts,
  posts,
}) => {
  const toast = useToast();
  const editSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title too small").required("Title is required"),
    body: Yup.string()
      .min(3, "Body text too small")
      .required("Body is required"),
  });

  const initialValues: initValues = {
    userId: data.userId,
    id: data.id,
    title: data.title,
    body: data.body,
  };

  const editArray = (array: Array<PostData>, newPost: PostData) => {
    // Returns a new array with the edited post
    const indexOfPost = array.findIndex((post) => post.id === newPost.id);
    return array.map((post, index) => (index === indexOfPost ? newPost : post));
  };

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      bg="rgba(0,0,0,0.5)"
      backdropFilter="blur(3px)"
      zIndex={20}
    >
      <Container
        marginTop="5em"
        maxW="container.xl"
        padding="2em"
        borderRadius="5px"
        bg="gray.100"
      >
        <Flex>
          <CloseIcon
            color="gray.400"
            _hover={{
              color: "black",
              cursor: "pointer",
              transition: "0.3s",
            }}
            marginLeft="auto"
            marginRight="1em"
            onClick={() => setEdit(false)}
          />
        </Flex>
        <Heading
          textAlign="center"
          size="lg"
          fontWeight="regular"
          color="gray.700"
        >
          Edit Post
        </Heading>
        <Formik
          validationSchema={editSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            const newPost = {
              userId: values.userId,
              id: values.id,
              title: values.title,
              body: values.body,
            };
            try {
              const response = await AxiosApi.patch(`${data.id}`, {
                title: values.title,
                body: values.body,
              });
              if (response.status === 200) {
                const newArray = editArray(posts, newPost);
                setPosts(newArray);
                setEdit(false);
              }
            } catch (error) {
              toast({
                title: "Error",
                description: "Couldn't edit post",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
          }}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <Flex flexDirection="column">
                <Field name="title">
                  {({ field, form }: any) => (
                    <FormControl
                      id="title"
                      isInvalid={form.errors.title && form.touched.title}
                    >
                      <FormLabel color="gray.500" htmlFor="title">
                        Title
                      </FormLabel>
                      <Input
                        {...field}
                        id="title"
                        color="gray.400"
                        _focus={{ color: "black" }}
                      />
                      <FormErrorMessage name="title">
                        {form.errors.title}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="body">
                  {({ field, form }: any) => (
                    <FormControl
                      id="body"
                      isInvalid={form.errors.body && form.touched.body}
                    >
                      <FormLabel marginTop="1em" color="gray.500">
                        Text
                      </FormLabel>
                      <Textarea
                        {...field}
                        id="body"
                        color="gray.400"
                        _focus={{ color: "black" }}
                      ></Textarea>
                      <FormErrorMessage name="body">
                        {form.errors.body}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Flex justifyContent="center">
                  <Button
                    marginTop="1em"
                    variant="outline"
                    colorScheme="blue"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Edit
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
