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
import { AxiosApi } from "../../utils/AxiosApi";
import { CloseIcon } from "@chakra-ui/icons";

interface initValues {
  title: string;
  body: string;
}

interface PostCreateProps {
  setCreate: Function;
}

export const PostCreate: React.FC<PostCreateProps> = ({ setCreate }) => {
  const toast = useToast();
  const createSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title too small").required("Title is required"),
    body: Yup.string()
      .min(3, "Body text too small")
      .required("Body is required"),
  });

  const initialValues: initValues = {
    title: "title",
    body: "body",
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
            onClick={() => setCreate(false)}
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
          validationSchema={createSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const response = await AxiosApi.post("", {
                title: values.title,
                body: values.body,
              });
              if (response.status === 200) {
                toast({
                  title: "Post created",
                  status: "success",
                  isClosable: true,
                  duration: 3000,
                });
              }
            } catch (error) {
              toast({
                title: "Error",
                description: "Couldn't create post",
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
