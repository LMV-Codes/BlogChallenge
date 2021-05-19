import { Button } from "@chakra-ui/button";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Input, useToast } from "@chakra-ui/react";
import { PostData } from "../../utils/CustomInterfaces";
import { AxiosApi } from "../../utils/AxiosApi";

interface PostEditProps {
  data: PostData;
}

interface initValues {
  title: string;
  body: string;
}

export const PostEdit: React.FC<PostEditProps> = ({ data }) => {
  const toast = useToast();
  const editSchema = Yup.object().shape({
    title: Yup.string().min(3, "Title too small").required("Title is required"),
    body: Yup.string()
      .min(3, "Body text too small")
      .required("Body is required"),
  });

  const initialValues: initValues = {
    title: data.title,
    body: data.body,
  };

  return (
    <Container
      maxW="container.sm"
      padding="2em"
      borderRadius="5px"
      bg="gray.100"
    >
      <Formik
        validationSchema={editSchema}
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const response = await AxiosApi.patch(`${data.id}`, {
              title: values.title,
              body: values.body,
            });
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
        {(props) => (
          <Form>
            <Flex flexDirection="column">
              <Heading textTransform="uppercase" textAlign="center">
                login
              </Heading>
              <Input placeholder="Title" name="title" />
              <Input placeholder="Body" name="body" />
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
  );
};
