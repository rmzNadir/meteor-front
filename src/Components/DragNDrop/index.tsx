/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useRef, useEffect, CSSProperties } from 'react';
import { Button, message } from 'antd';
import {
  InboxOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import {
  DropzoneInputProps,
  DropzoneRootProps,
  FileRejection,
} from 'react-dropzone';
import theme from '../../Utils/theme';
import {
  DraggerWrapper,
  DraggerContent,
  ListItemInfo,
  ItemsList,
  ItemsListTitle,
} from './styles';

interface Props {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  handleRemoveFile: (f: File) => void;
  maxSize?: number;
  maxFiles?: number;
  filesError: boolean;
  files: File[];
  rejectedFiles: FileRejection[];
  style?: CSSProperties;
}

const DragNDrop = ({
  filesError,
  getRootProps,
  getInputProps,
  files,
  rejectedFiles,
  maxSize = 5242880,
  maxFiles = 1,
  style,
  handleRemoveFile,
}: Props) => {
  const accFilesRef = useRef<HTMLDivElement>(null);
  const rejFilesRef = useRef<HTMLDivElement>(null);
  const renders = useRef(1);

  const inputProps = getInputProps();

  const scrollConfig: ScrollIntoViewOptions = {
    behavior: 'smooth',
  };

  const scrollToBottomAccepted = () => {
    accFilesRef.current && accFilesRef.current.scrollIntoView(scrollConfig);
  };

  const scrollToBottomRejected = () => {
    rejFilesRef.current && rejFilesRef.current.scrollIntoView(scrollConfig);
  };

  useEffect(() => {
    if (!!rejectedFiles.length && renders.current > 2) {
      const file = rejectedFiles[rejectedFiles.length - 1];
      const error = file && file.errors && file.errors[0].code;

      if (error) {
        switch (error) {
          case 'file-too-large':
            message.warn('El archivo que intentas subir es demasiado grande');
            break;
          case 'file-invalid-type':
            message.warn('Tipo de archivo no soportado');
            break;
          case 'too-many-files':
            message.warn(
              `No puedes subir más de ${maxFiles} ${
                maxFiles > 1 ? 'archivos' : 'archivo'
              }`
            );
            break;
          default:
            message.warn(
              `No puedes subir más de ${maxFiles} ${
                maxFiles > 1 ? 'archivos' : 'archivo'
              }`
            );
            break;
        }
      }
      scrollToBottomRejected();
    }
    renders.current += 1;
  }, [rejectedFiles]);

  useEffect(() => {
    if (!!files.length && renders.current > 2) {
      scrollToBottomAccepted();
    }
    renders.current += 1;
  }, [files]);

  // A regex would probably be better but...
  const acceptedExtensions = inputProps.accept
    ?.split(',')
    .map((w) => w.split('/')[1]);

  return (
    <div style={style}>
      <section>
        <DraggerWrapper errorBorder={filesError} {...getRootProps()}>
          <input className='dragger-input' {...inputProps} />
          <DraggerContent>
            <InboxOutlined />
            <div className='dragger-title'>
              Haz click o arrastra{' '}
              {maxFiles > 1
                ? `uno o hasta ${maxFiles} archivos
                        para subirlo(s)`
                : 'un archivo para subirlo'}
            </div>
            <div className='dragger-subtitle'>
              Solo se aceptan {acceptedExtensions?.map((e) => `*.${e} `)}
            </div>
            <div className='dragger-subtitle'>
              Tamaño máximo por archivo: {maxSize / 1048576}MB
            </div>
          </DraggerContent>
        </DraggerWrapper>
      </section>

      {files.length > 0 && (
        <>
          <ItemsListTitle>
            {files.length > 1 ? 'Aceptados' : 'Aceptado'}
          </ItemsListTitle>
          <ItemsList>
            {files.map((f: File, i) => {
              const { name } = f;
              return (
                <ListItemInfo key={i}>
                  <CheckCircleOutlined
                    style={{ color: theme.colors.success }}
                  />

                  <div>{name}</div>

                  <Button
                    style={{ justifyContent: 'flex-end' }}
                    danger
                    size='small'
                    shape='circle'
                    icon={<DeleteOutlined style={{ marginLeft: '1px' }} />}
                    onClick={() => handleRemoveFile(f)}
                  />
                </ListItemInfo>
              );
            })}
            <div ref={accFilesRef} />
          </ItemsList>
        </>
      )}
      {rejectedFiles.length > 0 && (
        <>
          <ItemsListTitle>
            {rejectedFiles.length > 1 ? 'Rechazados' : 'Rechazado'}
          </ItemsListTitle>
          <ItemsList>
            {rejectedFiles.map(({ file: { name } }: FileRejection, i) => {
              return (
                <ListItemInfo key={i} className='rejected-file'>
                  <CloseCircleOutlined style={{ color: theme.colors.error }} />
                  <div>{name}</div>
                </ListItemInfo>
              );
            })}
            <div ref={rejFilesRef} />
          </ItemsList>
        </>
      )}
    </div>
  );
};

export default DragNDrop;
