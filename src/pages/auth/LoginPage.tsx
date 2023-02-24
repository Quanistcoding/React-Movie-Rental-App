import AuthService from "services/AuthService";

function LoginPage() {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        AuthService.login();
      }}
    >
      Login with Google
    </button>
  );
}

export default LoginPage;
