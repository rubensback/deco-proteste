import { ConcelhosProvider } from './hooks/concelho';
import Routes from './routes';
import GlobalStyles from './styles';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  return (
    <ConcelhosProvider>
      <Routes />
      <GlobalStyles />
    </ConcelhosProvider>
  );
}

export default App;
