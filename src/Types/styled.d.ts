import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      content: string;
      border: string;
      success: string;
      error: string;
      textPrimary: string;
      textSecondary: string;
      formError: string;
      admin: string;
      user: string;
      client_user: string;
    };
    constants: {
      borderRadius: string;
    };
  }
}
