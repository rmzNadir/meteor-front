import { useState, useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Spin,
  Switch,
  Select,
} from 'antd';
import { useDropzone, FileRejection } from 'react-dropzone';
import NumberFormat from 'react-number-format';
import Amogus from '../../Utils/Amogus';
import { ILanguage, INewProductTemp, IPlatform } from '../../Types';
import CleanNumber from '../../Utils/CleanNumber';
import { TwoColumns } from './styles';

import DragNDrop from '../../Components/DragNDrop';
import ToFormData from '../../Utils/ToFormData';

const { Option } = Select;

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: FormData, resetFieldsCB: () => void) => Promise<boolean>;
  isSubmitting: boolean;
  initialValues?: INewProductTemp;
  isEdit?: boolean;
}

const MAX_FILES = 1;
const MAX_SIZE = 5242880;

const ProductForm = ({
  visible,
  setVisible,
  onSubmit,
  isSubmitting,
  initialValues,
  isEdit = false,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [platforms, setPlatforms] = useState<IPlatform[]>();
  const [languages, setLanguages] = useState<ILanguage[]>();
  const [hasFreeShipping, setHasFreeShipping] = useState(false);
  const [filesError, setFilesError] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [form] = Form.useForm();

  const handleAcceptedFiles = (f: File[]) => {
    setFiles(f);
    form.setFieldsValue({ image: f[0] });
    setFilesError(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpg, image/jpeg, image/png',
    onDrop: (f) =>
      files.length + f.length <= MAX_FILES && f.length > 0
        ? handleAcceptedFiles(f)
        : setRejectedFiles([
            ...rejectedFiles,
            ...f.map(
              (file: File) =>
                ({
                  file,
                  errors: [
                    { code: 'too-many-files', message: 'yo chill lmao' },
                  ],
                } as FileRejection)
            ),
          ]),
    onDropRejected: (f) => setRejectedFiles([...rejectedFiles, ...f]),
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
  });

  useEffect(() => {
    if (initialValues?.image) {
      setFiles([initialValues.image as unknown as File]);
    }

    if (initialValues?.has_free_shipping) {
      setHasFreeShipping(initialValues?.has_free_shipping);
    }

    if (visible && (!platforms || !languages)) {
      const getData = async () => {
        setIsLoading(true);
        const [platData, e1] = await Amogus({
          method: 'GET',
          url: '/platforms',
        });
        const [langData, e2] = await Amogus({
          method: 'GET',
          url: '/languages',
        });

        e1 &&
          message.error(
            'Ocurrió un error al cargar las plataformas disponibles.'
          );
        e2 &&
          message.error(
            'Ocurrió un error al cargar los lenguajes disponibles.'
          );

        setPlatforms(platData);
        setLanguages(langData);

        setIsLoading(false);
      };
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleFormOk = () => {
    form
      .validateFields()
      .then(
        async ({
          price,
          shipping_cost,
          stock,
          has_free_shipping,
          image,
          ...rest
        }: INewProductTemp) => {
          const formattedValues = {
            ...rest,
            // Avoid wrong params from being sent to the server on unchanged image product edit
            image: image.created_at ? undefined : image,
            price: CleanNumber(price),
            shipping_cost: CleanNumber(shipping_cost),
            stock: CleanNumber(stock),
            has_free_shipping: !!has_free_shipping,
          };

          const values = ToFormData(formattedValues);

          const shouldClearFiles = await onSubmit(values, form.resetFields);

          if (shouldClearFiles) {
            setHasFreeShipping(false);
            setFiles([]);
            setRejectedFiles([]);
          }
        }
      )
      .catch((info) => {
        const emptyFiles = info.errorFields.find(
          (i: { name: string[] }) => i.name[0] === 'image'
        );
        emptyFiles ? setFilesError(true) : setFilesError(false);
      });
  };

  const handleShippingSwitch = (checked: boolean) => {
    setHasFreeShipping(checked);
    form.setFieldsValue({ shipping_cost: checked ? '0' : '' });
  };

  const handleRemoveImage = (file: File) => {
    setFiles(files.filter((f) => f !== file));
    form.setFieldsValue({ image: undefined });
  };

  const handleCloseForm = () => {
    setFilesError(false);
    setFiles([]);
    setRejectedFiles([]);
    setVisible(false);
  };

  return (
    <Spin spinning={isLoading}>
      <Modal
        style={{ marginTop: '1.5rem' }}
        title={isEdit ? 'Editar producto' : 'Nuevo producto'}
        centered
        destroyOnClose
        visible={visible}
        onCancel={handleCloseForm}
        footer={[
          <Button key='close' onClick={handleCloseForm} disabled={isSubmitting}>
            Cerrar
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleFormOk}
            loading={isSubmitting}
          >
            {isEdit ? 'Guardar' : 'Crear'}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          preserve={false}
          scrollToFirstError
          initialValues={initialValues}
        >
          <Form.Item
            name='provider'
            label='Proveedor'
            rules={[
              {
                required: true,
                message: 'Es necesario ingresar el nombre del proveedor',
              },
            ]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            name='name'
            label='Nombre'
            rules={[
              {
                required: true,
                message: 'Es necesario ingresar un nombre',
              },
            ]}
          >
            <Input autoComplete='off' />
          </Form.Item>

          <Form.Item
            name='description'
            label='Descripción'
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Es necesario ingresar una descripción',
              },
            ]}
          >
            <Input.TextArea
              autoComplete='off'
              showCount
              maxLength={300}
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            name='languages'
            label='Lenguajes'
            rules={[
              {
                required: false,
                message: 'Es necesario seleccionar al menos un lenguaje',
              },
            ]}
          >
            <Select
              mode='multiple'
              getPopupContainer={(trigger) => trigger.parentElement}
              optionFilterProp='children'
              filterOption={(input, option) =>
                option?.children
                  .toLowerCase()
                  .indexOf(input.trim().toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {languages?.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='platforms'
            label='Plataformas'
            rules={[
              {
                required: false,
                message: 'Es necesario seleccionar al menos una plataforma',
              },
            ]}
          >
            <Select
              mode='multiple'
              getPopupContainer={(trigger) => trigger.parentElement}
              optionFilterProp='children'
              filterOption={(input, option) =>
                option?.children
                  .toLowerCase()
                  .indexOf(input.trim().toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {platforms?.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='price'
            label='Precio'
            rules={[
              {
                required: true,
                message: 'Es necesario ingresar el precio',
              },
            ]}
          >
            <NumberFormat
              autoComplete='off'
              customInput={Input}
              allowNegative={false}
              thousandSeparator=','
              decimalSeparator='.'
              decimalScale={2}
              prefix='$ '
            />
          </Form.Item>

          <Form.Item
            name='stock'
            label='Existencias'
            rules={[
              {
                required: true,
                message: 'Es necesario ingresar las existencias',
              },
            ]}
          >
            <NumberFormat
              autoComplete='off'
              customInput={Input}
              allowNegative={false}
              thousandSeparator=','
              decimalScale={0}
            />
          </Form.Item>

          <TwoColumns>
            <Form.Item
              name='has_free_shipping'
              label='¿Cuenta con un envío gratuito?'
              className='switch-space'
              valuePropName='checked'
            >
              <Switch
                checkedChildren='Sí'
                unCheckedChildren='No'
                onChange={handleShippingSwitch}
              />
            </Form.Item>
            <Form.Item
              name='shipping_cost'
              label='Costo de envío'
              dependencies={['has_free_shipping']}
              required={!hasFreeShipping}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const freeShipping = !!getFieldValue('has_free_shipping');

                    if (freeShipping) {
                      return Promise.resolve();
                    }
                    if (!freeShipping && !!value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error('Es necesario especificar el costo de envío')
                    );
                  },
                }),
              ]}
            >
              <NumberFormat
                autoComplete='off'
                customInput={Input}
                allowNegative={false}
                thousandSeparator=','
                decimalSeparator='.'
                decimalScale={2}
                prefix='$ '
                disabled={hasFreeShipping}
              />
            </Form.Item>
          </TwoColumns>

          <Form.Item
            name='image'
            label='Imagen del producto'
            rules={[
              {
                required: true,
                message: 'Es necesario adjuntar una imagen del producto',
              },
            ]}
          >
            <DragNDrop
              style={{ margin: '0.5rem 0' }}
              maxFiles={MAX_FILES}
              maxSize={MAX_SIZE}
              files={files}
              rejectedFiles={rejectedFiles}
              filesError={filesError}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              handleRemoveFile={handleRemoveImage}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ProductForm;
