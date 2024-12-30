import { useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { AuthPage } from './pages/AuthPage';
import { TasksPage } from './pages/TasksPage';
import { Toaster } from './components/ui/toaster';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <TaskProvider>
          <TasksPage />
        </TaskProvider>
      ) : (
        <AuthPage />
      )}
      <Toaster />
    </>
  );
}

export default App;