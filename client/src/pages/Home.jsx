import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_IMAGE } from "../utils/mutations";
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
import colors from "../../src/components/colors";
import ProfileList from "../components/ProfileList";
import { QUERY_PROFILES } from "../utils/queries";
import Auth from '../utils/auth';

const Main = styled.main`
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.h2`
  color: ${colors.textColor};
`;

const H3 = styled.h3`
  color: ${colors.textColor};
`;

const UserInput = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 10px 25px;
  color: ${colors.btnTextColor};
  background: #44f49c;
  border-radius: 5px;
  border-color: ${colors.btnBackgroundColor};
`;

const Input = styled.input`
  width: 200px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const EarthIMG = styled.img`
  width: 25rem;
  height: 25rem;
  border: 2px solid #333;
  border-color: white;
`;

const Description = styled.p`
  margin-top: 20px;
  color: ${colors.textColor};
  text-align: center;
`;

const Home = () => {
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState(null);
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];
  const [saveImage] = useMutation(SAVE_IMAGE);

  const loggedInProfile = Auth.getProfile().data; // Retrieve logged-in user's data
  const profileId = loggedInProfile?._id; // Get profileId if user is logged in

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    makeAPICall();
  };

  const handleSaveImage = () => {
    if (imageData && profileId) {
      saveImage({
        variables: { profileId: profileId, skyshot: imageData.imageUrl },
      })
        .then((response) => {
          console.log("Image saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving image:", error);
        });
    }
  };

  const makeAPICall = () => {
    // Make the API call to fetch the image
    const apiKey = "Ue6danDpKoU3nXsZz0t5brDpTdMphdOOdD5rW1HB";
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`,
      true
    );
    request.addEventListener("load", function () {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        if (typeof response[0].image === "string") {
          setImageData({
            status: "Found",
            imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${date.replace(
              /-/g,
              "/"
            )}/jpg/${response[0].image}.jpg`,
            caption: response[0].caption,
          });
        }
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    });
    request.send();
  };

  return (
    <Main>
      <div>
        <Wrapper>
          <H2>Generate your Image from 2016 Onwards!</H2>
          <H3>(NASA did not have cameras until then)</H3>
          <UserInput>
            <Input
              type="date"
              className="form-control"
              placeholder="Select a date"
              value={date}
              onChange={handleDateChange}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </UserInput>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}

          {imageData && imageData.status === 'Found' && (
            <>
              <EarthIMG src={imageData.imageUrl} alt="Earth" />
              <Description>{imageData.caption}</Description>
              <Button onClick={handleSaveImage}>Save Image</Button>
            </>
          )}
        </Wrapper>
      </div>
    </Main>
  );
};

export default Home;
