import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      content: string;
      border: string;
      success: string;
      error: string;
      textPrimary: string;
      textSecondary: string;
      formError: string;
    };
    constants: {
      borderRadius: string;
    };
  }
}
