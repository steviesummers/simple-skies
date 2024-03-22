import { useLocation, useNavigate } from "react-router-dom"; // Import the helper functions; useLocation helps with query params and paths, useNavigate helps with navigating to different paths & routes
import styled from "styled-components"; // Imports the styled variabke from the styled-components CSS library
import colors from "../colors";


// styled-components
const Footing = styled.footer`
  background: ${colors.background};
`;
const H4 = styled.footer`
  color: ${colors.textColor};
`;
const Button = styled.button`
  padding: 10px 25px;
  color: ${colors.btnTextColor};
  background: #44f49c;
  border-radius: 5px;
  border-color: ${colors.btnBackgroundColor}
`;


// The returned Footer
const Footer = () => {
  // calls and stores the helper functions inside variables
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Footing className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <Button onClick={() => navigate(-1)}>
            &larr; Go Back
          </Button>
        )}
        <H4>&copy; {new Date().getFullYear()} - Lost Galaxy Friends</H4>
      </div>
    </Footing>
  );
};

export default Footer;
