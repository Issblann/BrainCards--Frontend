import { BrowserRouter as Router } from 'react-router-dom';
import { Router as RouterComponent } from './routes';
import Header from './components/Header.tsx';
function App() {
  return (
    <div className="mx-auto max-w-7xl flex bg-primary h-screen flex-col justify-center items-center">
      <Router>
        <Header />
        <RouterComponent />
      </Router>
    </div>
  );
}

export default App;
