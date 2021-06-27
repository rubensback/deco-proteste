import { ConcelhosProvider } from './hooks/concelho';
import Routes from './routes';

function App() {
  return (
    <ConcelhosProvider>
      <Routes />
    </ConcelhosProvider>
  );
}

export default App;
