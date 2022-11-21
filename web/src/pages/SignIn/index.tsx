import React, { useCallback, useRef } from "react"
import logoImage from "../../assets/logo-ngcash-branco.svg";
import { Link } from "react-router-dom";

import { FiLock, FiLogIn, FiUser } from "react-icons/fi"
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { Container, Content, Background, ImageBackground } from "./style";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import useAuth from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import getValidationErros from "../../utils/getValidationErrors";

interface ISignDataForm {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ISignDataForm) => {

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário é obrigatório'),
        password: Yup.string().required('Senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        username: data.username,
        password: data.password
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na altenticação',
        description: 'Occoreu um erro ao fazer login, cheque as credenciais'
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logoImage} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit} >
          <h1>Faça seu login</h1>

          <Input name="username" icon={FiUser} placeholder="Usuário" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

        </Form>

        <Link to={"/signup"} >
          <FiLogIn />
          Criar Conta
        </Link>

      </Content>

      <Background>
        <ImageBackground />
      </Background>
    </Container>
  )
};

export { SignIn };