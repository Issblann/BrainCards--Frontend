import { BrowserRouter as Router } from 'react-router-dom';
import { Router as RouterComponent } from './routes/index.tsx';
function App() {
  return (
    <Router>
      <RouterComponent />
    </Router>
  );
}

export default App;
