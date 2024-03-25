const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in profile without specifically searching for them
    me: async (parent, args, context) => {
      if (context.profile) {
        return Profile.findOne({ _id: context.profile._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addSkyshot: async (parent, { profileId, skyShot }, context) => {
      // If context has a `profile` property, that means the profile executing this mutation has a valid JWT and is logged in
      if (context.profile) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { skyShots: skyShot },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If profile attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },
    // Set up mutation so a logged in profile can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.profile) {
        return Profile.findOneAndDelete({ _id: context.profile._id });
      }
      throw AuthenticationError;
    },
    // Make it so a logged in profile can only remove a skyshot from their own profile
    removeSkyshot: async (parent, { skyShot }, context) => {
      if (context.profile) {
        return Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $pull: { skyShots: skyShot } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
