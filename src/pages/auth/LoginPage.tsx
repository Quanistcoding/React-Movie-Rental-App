import AuthService from "services/AuthService";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogin = () => {
    AuthService.login(() => {
      const returnUrl = searchParams.get("returnUrl");
      if (returnUrl) return navigate("/" + returnUrl);
      navigate("/");
    });
  };

  return (
    <button className="btn btn-primary" onClick={handleLogin}>
      Login with Google
    </button>
  );
}

export default LoginPage;
