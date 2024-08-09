import { BrowserRouter as Router } from 'react-router-dom';
import { Router as RouterComponent } from './routes';
import { Header } from './components';
function App() {
  return (
    <div className="mx-auto max-w-[1480px] flex bg-primary h-full mb-4 px-4 flex-col mt-32 items-center">
      <Router>
        <Header />
        <RouterComponent />
      </Router>
    </div>
  );
}

export default App;
