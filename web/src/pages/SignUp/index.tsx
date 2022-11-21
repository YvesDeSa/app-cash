import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiUser, FiLock } from 'react-icons/fi'
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link, useNavigate } from "react-router-dom";

import logoImage from "../../assets/logo-ngcash-branco.svg";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content, Background, ImageBackground } from "./style";

import api from "../../services/api";
import { useToast } from "../../hooks/toast";

import getValidationErros from "../../utils/getValidationErrors";
import * as Yup from 'yup';

interface ISignUpFormData {
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: ISignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Usuário é obrigatório').min(3, 'No mínimo 3 dígitos'),
        password: Yup.string().required('Senha é obrigatório').matches(/^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/, "Senha precisar de pelo menos 8 caracteres, um número e uma letra maiúscula.")
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users/create', data);

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu login'
      });

      navigate('/');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na altenticação',
        description: 'Occoreu um erro ao fazer cadastro'
      });
    }
  }, [addToast, navigate]);

  return (
    <Container>
      <Content>
        <img src={logoImage} alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit} >
          <h1>Faça seu cadastro</h1>

          <Input name="username" icon={FiUser} placeholder="Usuário" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>

        </Form>

        <Link to={"/"} >
          <FiArrowLeft />
          Voltar para login
        </Link>

      </Content>

      <Background>
        <ImageBackground />
      </Background>
    </Container>
  )
};

export { SignUp };