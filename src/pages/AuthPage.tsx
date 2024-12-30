import { useState } from 'react';
import { LoginForm } from '../components/auth/LoginFormt';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Button } from '../components/ui/button';
import { CheckSquare } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
      <div className="mb-8 text-center">
        <CheckSquare className="h-12 w-12 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Task Manager</h1>
        <p className="text-muted-foreground">
          Stay organized and boost your productivity
        </p>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}

      <div className="mt-6 text-center">
        <p className="text-muted-foreground mb-2">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Sign in'}
        </Button>
      </div>
    </div>
  );
}