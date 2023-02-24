import AuthService from "services/AuthService";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AuthGuard(props: { component: JSX.Element; returnUrl: string }) {
  const [user, setUser] = useState<any>({} as any);

  useEffect(() => {
    AuthService.getUser((user) => {
      setUser(user);
    });
  }, []);
  return (
    <>
      {user ? (
        props.component
      ) : (
        <Navigate to={"/login?returnUrl=" + props.returnUrl} />
      )}
    </>
  );
}

export default AuthGuard;
