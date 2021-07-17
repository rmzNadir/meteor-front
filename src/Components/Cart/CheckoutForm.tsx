import { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import NumberFormat from 'react-number-format';
import { TwoColumns } from './styles';
import { ICheckoutForm } from '../../Types';

const { Option } = Select;

interface Props {
  handleCancelCheckout(resetForm: () => void): void;
  onSubmit(formValues: ICheckoutForm, resetForm: () => void): Promise<void>;
}

const CheckoutForm = ({ handleCancelCheckout, onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: ICheckoutForm) => {
    setIsLoading(true);
    await onSubmit(values, form.resetFields);
    setIsLoading(false);
  };

  return (
    <Form form={form} layout='vertical' scrollToFirstError onFinish={onFinish}>
      <Form.Item
        name='payment_method'
        label='Método de pago'
        rules={[
          {
            required: true,
            message: 'Es necesario seleccionar un método de pago',
          },
        ]}
      >
        <Select>
          <Option value='0'>Tarjeta de crédito</Option>
          <Option value='1'>Tarjeta de débito</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='payment_info'
        label='Número de tarjeta'
        rules={[
          {
            required: true,
            message: 'Es necesario ingresar el número de la tarjeta',
          },
          {
            validator: async (_, value) => {
              return !value || value.trim().length === 19
                ? Promise.resolve()
                : Promise.reject(
                    new Error('Por favor ingresa los 16 dígitos de tu tarjeta')
                  );
            },
          },
        ]}
      >
        <NumberFormat
          autoComplete='off'
          customInput={Input}
          allowNegative={false}
          format='#### #### #### ####'
        />
      </Form.Item>

      <TwoColumns>
        <Form.Item
          name='payment_info_expiration'
          label='Fecha de expiración'
          rules={[
            {
              required: true,
              message: 'Es necesario ingresar la fecha de expiración',
            },
            {
              validator: async (_, value) => {
                return !value || value.trim().length === 5
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        'Por favor ingresa los 4 dígitos de la fecha de expiración'
                      )
                    );
              },
            },
          ]}
        >
          <NumberFormat autoComplete='off' customInput={Input} format='##/##' />
        </Form.Item>
        <Form.Item
          name='payment_info_code'
          label='Código de seguridad'
          rules={[
            {
              required: true,
              message: 'Es necesario ingresar el código de seguridad',
            },
            {
              validator: async (_, value) => {
                return !value || value.trim().length === 4
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('Por favor ingresa los 4 dígitos de seguridad')
                    );
              },
            },
          ]}
        >
          <NumberFormat autoComplete='off' customInput={Input} format='####' />
        </Form.Item>
      </TwoColumns>

      <Form.Item
        name='address'
        label='Dirección de envío'
        rules={[
          {
            required: true,
            message: 'Es necesario ingresar la dirección de envío',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <TwoColumns style={{ marginTop: '1rem' }}>
        <Button
          disabled={isLoading}
          block
          onClick={() => handleCancelCheckout(form.resetFields)}
        >
          Cancelar
        </Button>
        <Form.Item>
          <Button loading={isLoading} type='primary' block htmlType='submit'>
            Comprar
          </Button>
        </Form.Item>
      </TwoColumns>
    </Form>
  );
};

export default CheckoutForm;
