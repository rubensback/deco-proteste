import { ConcelhosProvider } from './hooks/concelho';
import Routes from './routes';
import GlobalStyles from './styles';

function App() {
  return (
    <ConcelhosProvider>
      <Routes />
      <GlobalStyles />
    </ConcelhosProvider>
  );
}

export default App;
