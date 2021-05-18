import { Button } from "@chakra-ui/button";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import CustomField from "../components/form/CustomField";
import { useToast } from "@chakra-ui/react";

export const Login: React.FC = () => {
  const toast = useToast();
  const history = useHistory();

  const checkLogin = () => {
    if (localStorage.getItem("token") !== null) {
      history.push("/");
    }
  };

  useEffect(() => {
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Email too short")
      .max(100, "Email too long")
      .required("Email is required")
      .email(),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .max(100, "Password is too long")
      .required("Password is required"),
  });

  return (
    <Container
      maxW="container.sm"
      padding="2em"
      borderRadius="5px"
      bg="gray.100"
    >
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const response = await axios.post(
              "http://challenge-react.alkemy.org",
              {
                email: values.email,
                password: values.password,
              }
            );
            localStorage.setItem("token", response.data.token);
            history.push("/");
          } catch (error) {
            toast({
              title: "Error",
              description: "Wrong Email or Password",
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
              <CustomField fieldValue="email" />
              <CustomField fieldValue="password" isPassword />
              <Flex justifyContent="center">
                <Button
                  marginTop="1em"
                  variant="outline"
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
