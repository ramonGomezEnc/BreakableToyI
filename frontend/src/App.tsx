import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import TaskManager from './components/TaskManager';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <div>
        <TaskManager />
      </div>
    </>
  );
};

export default App;
