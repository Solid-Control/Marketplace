import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BackgroundDesktop, Container, Form } from "./style";
import Input from "../../components/input";
import Logo from "../../components/logo";
import Button from "../../components/button";
import Banner from "../../assets/bannerSolid2.png";
import { defaultAnimation, defaultTransition } from "../../utils/defaultMotion";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LoginPage = () => {
  const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [inViewRef3, inView3] = useInView({
    threshold: 0.2,
  });

  const animation4 = useAnimation();

  useEffect(() => {
    if (inView3) {
      animation4.start({
        y: 0,
        transition: {
          type: "spring",
          duration: 4,
          bounce: 0.4,
        },
      });
    }
    if (!inView3) {
      animation4.start({ y: "-50vh" });
    }
  }, [inView3]);

  return (
    <Container animate={defaultAnimation} transition={defaultTransition}>
      <BackgroundDesktop>
        <img src={Banner} alt="Imagem decorativa produtos culinários" />
      </BackgroundDesktop>
      <Form onSubmit={handleSubmit(console.log("oi"))}>
        <Logo />
        <motion.h1 ref={inViewRef3} animate={animation4}>
          Faça seu Login aqui !
        </motion.h1>
        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          name="email"
          register={register}
          error={errors.email?.message}
        ></Input>

        <Input
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          name="password"
          register={register}
          error={errors.password?.message}
        ></Input>

        <Button children="Logar" type="submit" />

        <p>
          Não possui conta? <Link to="/register">Registre-se</Link>
        </p>
      </Form>
    </Container>
  );
};

export default LoginPage;
