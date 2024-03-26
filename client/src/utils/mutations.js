import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_SKYSHOT = gql`
  mutation addSkyshot($profileId: ID!, $skyshot: String!) {
    addSkyshot(profileId: $profileId, skyshot: $skyshot) {
      _id
      name
      skyshots
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKYSHOT = gql`
  mutation removeSkyshot($skyshot: String!) {
    removeSkyshot(skyshot: $skyshot) {
      _id
      name
      skyshots
    }
  }
`;

export const SAVE_IMAGE = gql`
mutation AddSkyshot($profileId: ID!, $skyshot: String!) {
  addSkyshot(profileId: $profileId, skyshot: $skyshot) {
    _id
    name
    email
    password
    skyshots
  }
}
`;
