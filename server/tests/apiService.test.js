// apiService.test.js

// Import axios
const axios = require('axios');

//const { makeAPICall } = require('../utils/apiService.js');

describe('API Service', () => {
  test('makeAPICall function should make a GET request to the specified endpoint', async () => {
    // Mock Axios for testing
    axios.request = jest.fn(() => Promise.resolve({ data: 'mock response' }));

    // Importing makeAPICall function after axios has been mocked
    const { makeAPICall } = require('../utils/apiService');

    // Call the function
    const result = await makeAPICall('bodies');

    axios.request();

    // Assertions
    expect(axios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.astronomyapi.com/api/v2/bodies',
      headers: {
        Authorization: 'Basic YourAuthStringHere'
      },
      data: null
    });
    expect(result).toEqual('mock response');
  });
});
