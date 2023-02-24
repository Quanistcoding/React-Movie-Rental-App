import React from "react";

export const UserContext = React.createContext({
  user: {
    displayName: "",
    userRole: "",
  },
  updateUserState(user: any) {},
});
