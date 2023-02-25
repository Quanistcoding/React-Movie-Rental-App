import AuthService from "services/AuthService";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AuthGuard(props: { component: JSX.Element; returnUrl: string }) {
  const [user, setUser] = useState<any>({} as any);
  const [component, setComponent] = useState<any>(<div></div>);

  useEffect(() => {
    AuthService.getUser((user) => {
      setUser(user);
      if (user) setComponent(props.component);
    });
  }, [props]);

  return (
    <>
      {user ? (
        component
      ) : (
        <Navigate to={"/login?returnUrl=" + props.returnUrl} />
      )}
    </>
  );
}

export default AuthGuard;
