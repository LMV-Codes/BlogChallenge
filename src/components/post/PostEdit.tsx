import { Button } from "@chakra-ui/button";
import { Box, Container, Flex } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import { PostData } from "../../utils/CustomInterfaces";
import { AxiosApi } from "../../utils/AxiosApi";
import { CloseIcon } from "@chakra-ui/icons";

interface PostEditProps {
  setEdit: Function;
  data: PostData;
}

interface initValues {
  title: string;
  body: string;
}

export const PostEdit: React.FC<PostEditProps> = ({ data, setEdit }) => {
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
    <Box
      position="absolute"
      top="0"
      left="0"
      height="100%"
      width="100%"
      bg="rgba(120,120,120,0.8)"
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
        <Formik
          validationSchema={editSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const response = await AxiosApi.patch(`${data.id}`, {
                title: values.title,
                body: values.body,
              });
              return response.data;
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
                <FormLabel color="gray.500">Title</FormLabel>
                <Field as={Input} name="title" color="gray.700" />
                <FormLabel marginTop="1em" color="gray.500">
                  Text
                </FormLabel>
                <Field as={Textarea} name="body" color="gray.700" />
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
