import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
//require('dotenv').config();

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';

const Home = () => {
  const [date, setDate] = useState('');
  const [imageData, setImageData] = useState(null); // State to hold the image data
  const { loading, data } = useQuery(QUERY_PROFILES);
  const profiles = data?.profiles || [];

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    // Perform API call here
    makeAPICall();
  };

  const makeAPICall = () => {
    // Make the API call to fetch the image
    const apiKey = 'Ue6danDpKoU3nXsZz0t5brDpTdMphdOOdD5rW1HB';
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${apiKey}`, true);
    request.addEventListener('load', function () {
      if (request.status >= 200 && request.status < 400) {
        const response = JSON.parse(request.responseText);
        if (typeof response[0].image === 'string') {
          setImageData({
            status: 'Found',
            imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${date.replace(/-/g, '/')}/jpg/${response[0].image}.jpg`,
            caption: response[0].caption
          });
        }
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    });
    request.send();
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <div className="input-group mb-3">
            <input
              type="date"
              className="form-control"
              placeholder="Select a date"
              value={date}
              onChange={handleDateChange}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}
          {imageData && imageData.status === 'Found' && ( // Display the image if imageData is available
            <div>
              <img src={imageData.imageUrl} alt="Earth" />
              <p>{imageData.caption}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
