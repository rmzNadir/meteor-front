import { useState } from 'react';
import { Card, Typography, Form, Input, message, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { ILoginFormValues } from '../../Types';
import { LogoSpace, Info, SubmitButton } from './styles';
import AnimateAuthForms from '../../Components/AnimateAuthForms';
import { useAuthCTX } from '../../Utils/AuthContext';

const { Title, Text, Link } = Typography;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();
  const { setIsAuth, setUser } = useAuthCTX();

  const onFinish = async (values: ILoginFormValues) => {
    setIsLoading(true);
    try {
      const {
        data: { success, user },
      } = await axios.post('/sessions', values);

      setIsLoading(false);

      if (success) {
        setIsAuth(true);
        setUser(user);
        message.success(`Bienvenido de nuevo, ${user.name} 👋`);
        setTimeout(() => {
          history.push('/products');
        }, 250);
      } else {
        message.error('Revisa tus credenciales');
      }
    } catch (e) {
      message.error('Revisa tus credenciales');
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <AnimateAuthForms>
      <Card
        className='form-card'
        type='inner'
        title={
          <LogoSpace>
            <img src='/images/meteor.png' alt='meteor-logo' />
          </LogoSpace>
        }
      >
        <Info>
          <Title level={3}>Inicia sesión con tu cuenta</Title>
          <div>
            <Text>¿Aún no tienes una?</Text>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link onClick={() => history.push('/sign-up')}> Crear cuenta</Link>
          </div>
        </Info>

        <Form
          form={form}
          name='login'
          layout='vertical'
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {
                type: 'email',
                message: 'Es necesario ingresar un email válido',
              },
              {
                required: true,
                message: 'Es necesario ingresar tu email',
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Contraseña'
            rules={[
              {
                required: true,
                message: 'Es necesario ingresar tu contraseña',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <SubmitButton
              loading={isLoading}
              type='primary'
              block
              htmlType='submit'
            >
              Iniciar sesión
            </SubmitButton>
          </Form.Item>
        </Form>
        <Button block type='link' onClick={() => history.push('/')}>
          Inicio
        </Button>
      </Card>
    </AnimateAuthForms>
  );
};

export default Login;
