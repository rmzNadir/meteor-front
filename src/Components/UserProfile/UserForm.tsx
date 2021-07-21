/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';
import { useDropzone, FileRejection } from 'react-dropzone';
import { IUserTemp } from '../../Types';
import DragNDrop from '../DragNDrop';
import ToFormData from '../../Utils/ToFormData';

const { Option } = Select;

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: FormData, resetFieldsCB: () => void) => Promise<boolean>;
  isSubmitting: boolean;
  initialValues?: IUserTemp;
  isEdit?: boolean;
}

const MAX_FILES = 1;
const MAX_SIZE = 1048576;

const UserForm = ({
  visible,
  setVisible,
  onSubmit,
  isSubmitting,
  initialValues,
  isEdit = false,
}: Props) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleFormOk = () => {
    form
      .validateFields()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(async ({ image, password_confirmation, ...rest }: IUserTemp) => {
        const formattedValues = {
          ...rest,
          // Avoid wrong params from being sent to the server on unchanged image user edit
          // Delete image if not present in patch body
          image: image ? (image?.created_at ? undefined : image) : 'DELETE',
        };

        const values = ToFormData(formattedValues);

        const shouldClearFiles = await onSubmit(values, form.resetFields);

        if (shouldClearFiles) {
          setFiles([]);
          setRejectedFiles([]);
        }
      })
      .catch((info) => {
        const emptyFiles = info.errorFields.find(
          (i: { name: string[] }) => i.name[0] === 'image'
        );
        emptyFiles ? setFilesError(true) : setFilesError(false);
      });
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
    <Modal
      style={{ marginTop: '1.5rem' }}
      title='Editar usuario'
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
          name='last_name'
          label='Apellidos'
          rules={[
            {
              required: true,
              message: 'Es necesario ingresar al menos un apellido',
            },
          ]}
        >
          <Input autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: 'Es necesario ingresar un email',
            },
          ]}
        >
          <Input autoComplete='off' />
        </Form.Item>

        <Form.Item
          name='role'
          label='Rol'
          rules={[
            {
              required: true,
              message: 'Es necesario seleccionar un rol',
            },
          ]}
        >
          <Select
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
            <Option value='admin'>Administrador</Option>
            <Option value='client_user'>Gerente</Option>
            <Option value='user'>Usuario</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name='password'
          label='Nueva contraseña'
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value && getFieldValue('password_confirmation')) {
                  return Promise.reject(
                    new Error(
                      'Es necesario rellenar ambos campos para una nueva contraseña'
                    )
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password autoComplete='new-password' />
        </Form.Item>

        <Form.Item
          name='password_confirmation'
          label='Confirmación de nueva contraseña'
          dependencies={['password']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value && getFieldValue('password')) {
                  return Promise.reject(
                    new Error('Es necesario confirmar la nueva contraseña')
                  );
                }
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
          <Input.Password autoComplete='new-password' />
        </Form.Item>

        <Form.Item name='image' label='Foto de perfil'>
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
  );
};

export default UserForm;
