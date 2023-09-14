import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

function App() {
  const { isLoading, error } = useAuth0();
  return (
    <div>
      <h1>Auth0 Authentication</h1>
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading....</p>}
      {!error && !isLoading &&
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      }
    </div>
  );
}

export default App;
