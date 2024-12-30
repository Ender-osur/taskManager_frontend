import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../hooks/use-toast";
import * as api from "../../lib/api";

const useAuthController = () => {
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (
    email: string,
    password: string,
    onLoading: (loading: boolean) => void
  ) => {
    onLoading(true);

    try {
      const { token, user } = await api.login(email, password);
      login(token, user);
    } catch {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      onLoading(false);
    }
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    onLoading: (loading: boolean) => void
  ) => {
    onLoading(true);

    try {
      const { token, user } = await api.register(email, password, name);
      login(token, user);
    } catch {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    } finally {
      onLoading(false);
    }
  };

  return { handleLogin, handleRegister };
};

export default useAuthController;
