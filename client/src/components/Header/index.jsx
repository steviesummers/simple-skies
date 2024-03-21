import { Link } from "react-router-dom"; // Import the Link tag, to help with navigating to routes without page reload
import Auth from "../../utils/auth"; // Imports our Authorization
import { styled, keyframes } from "styled-components"; // Imports the styled variabke from the styled-components CSS library
import colors from "../colors"


// styled-components
// Create the keyframes
const rotate = keyframes`
  from {
    transform: (0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 3s linear infinite;
  padding: 2rem 1rem;
  font-size: 5rem;
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;
const Pulse = styled.div`
  animation: ${pulse} 2s infinite;
`;

const H1 = styled.h1`
  color: ${colors.textColor};
  font-size: 3rem;
`;
const Button = styled.button`
  padding: 10px 25px;
  color: ${colors.btnTextColor};
  background: #44f49c;
  border-radius: 5px;
  border-color: ${colors.btnBackgroundColor}
`;
const Heading = styled.header`
  background: #1e1e1e;
  color: ${colors.textColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const P = styled.p`
  colors: ${colors.textColor};
  font-size: 1rem;
`


// The returned Header
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Heading> 
        {/* Logo when clicked leads back to "/" route */}
        <Link to="/">
        <Rotate> 🌎 </Rotate>
        </Link>
        <Link to="/">
          <H1 > Ur-ni-Earth Teller </H1>
        </Link>
        {/* Description of our Web-App. */}
        <P>
          As an individual who contemplates my place in the universe, I want to see pictures of the Earth on given dates so that when I look back on this little life, I can see that pale blue dot on a set on given dates.
        </P>
      <div>
        <div>
          {/* If logged in, display this */}
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            // If NOT logged in, display this
            <>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Heading>
  );
};

export default Header;
