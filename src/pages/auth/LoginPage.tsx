import AuthService from "services/AuthService";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
function LoginPage() {
  const userContext = useContext(UserContext);

  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        AuthService.login((user) => {
          userContext.updateUserState(user);
        });
      }}
    >
      Login with Google
    </button>
  );
}

export default LoginPage;
