import { useState } from 'react';
import { Card, Typography, Form, Input, message, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { IFormValues } from '../../Types';
import { LogoSpace, Info, SubmitButton, TwoColumns } from './styles';
import DisplayErrors from '../../Utils/DisplayErrors';
import AnimateAuthForms from '../../Components/AnimateAuthForms';
import { useAuthCTX } from '../../Utils/AuthContext';

const { Title, Text, Link } = Typography;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { setIsAuth, setUser } = useAuthCTX();
  const [form] = Form.useForm();

  const onFinish = async (values: IFormValues) => {
    setIsLoading(true);
    try {
      const {
        data: { success, errors, user },
      } = await axios.post('/registrations', values);

      if (success) {
        setIsAuth(true);
        setUser(user);
        message.success(`Bienvenido, ${user.name} ✨`);
        setTimeout(() => {
          history.push('/products');
        }, 250);
      } else if (errors) {
        DisplayErrors(errors);
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <AnimateAuthForms>
      <Card
        type='inner'
        title={
          <LogoSpace>
            <img src='/images/meteor.png' alt='meteor-logo' />
          </LogoSpace>
        }
      >
        <Info>
          <Title level={3}>Crea una nueva cuenta</Title>
          <div>
            <Text>¿Ya tienes una?</Text>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link onClick={() => history.push('/login')}> Iniciar sesión</Link>
          </div>
        </Info>

        <Form
          form={form}
          name='signup'
          layout='vertical'
          onFinish={onFinish}
          scrollToFirstError
        >
          <TwoColumns>
            <Form.Item
              name='name'
              label='Nombre'
              rules={[
                {
                  required: true,
                  message: 'Es necesario ingresar tu nombre',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='last_name'
              label='Apellidos'
              rules={[
                {
                  required: true,
                  message: 'Es necesario ingresar tus apellidos',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
          </TwoColumns>

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
                message: 'Es necesario ingresar un email',
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
                message: 'Es necesario ingresar una contraseña',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='password_confirmation'
            label='Confirmación de contraseña'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message:
                  'Es necesario ingresar una confirmación para la contraseña',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Las contraseñas no coinciden')
                  );
                },
              }),
            ]}
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
              Registrarme
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

export default SignUp;
