import AuthService from "services/AuthService";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { useContext } from "react";

function AuthGuard(props: { component: JSX.Element; returnUrl: string }) {
  const [user, setUser] = useState<any>({} as any);
  const [component, setComponent] = useState<any>(<div></div>);
  const userContext = useContext(UserContext);

  useEffect(() => {
    AuthService.getUser("authGuard", (user) => {
      setUser(user);
      if (user) {
        setComponent(props.component);
      }
    });
  }, [props, userContext]);

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
