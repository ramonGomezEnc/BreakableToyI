import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';
import TaskManager from './components/TaskManager';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div style={{ padding: '20px' }}>
        <TaskManager />
      </div>
    </ThemeProvider>
  );
};

export default App;
