import { publicPOST, privatePOST, privatePUT } from './fetcher.js';

// Mock users data for offline mode
const mockUsers = {
  'tony@stark.com': {
    password: 'password123',
    token: 'mock-token-tony-stark',
    firstName: 'Tony',
    lastName: 'Stark',
    userName: 'tonystark',
  },
  'steve@rogers.com': {
    password: 'password456',
    token: 'mock-token-steve-rogers',
    firstName: 'Steve',
    lastName: 'Rogers',
    userName: 'steverogers',
  }
};

// Helper function to get user from token
const getUserFromToken = (token) => {
  const users = Object.values(mockUsers);
  return users.find((user) => user.token === token);
};

export const loginUser = async (username, password) => {
  const URL = 'http://localhost:3001/api/v1/user/login';
  const body = {
    email: username,
    password: password,
  };

  try {
    return await publicPOST(URL, body);
  } catch (error) {
    // If server is unreachable, check mock credentials
    const mockUser = mockUsers[username.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      return {
        status: 200,
        message: 'User successfully logged in',
        body: {
          token: mockUser.token
        }
      };
    }
    throw error;
  }
};

export const getUserProfile = async (token) => {
  const URL = 'http://localhost:3001/api/v1/user/profile';

  try {
    return await privatePOST(URL, token);
  } catch (error) {
    // If server is unreachable, return mock user data based on token
    const mockUser = getUserFromToken(token);
    if (mockUser) {
      return {
        status: 200,
        message: 'User profile retrieved successfully (mock)',
        body: {
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          userName: mockUser.userName,
        }
      };
    }
    throw error;
  }
};

// ✅ updatedData = { userName: "..." } (ou d’autres champs plus tard)
export const updateUserProfile = async (token, updatedData) => {
  const URL = 'http://localhost:3001/api/v1/user/profile';

  try {
    // Online: envoie les champs fournis (ex: { userName })
    return await privatePUT(URL, token, updatedData);
  } catch (error) {
    // Offline mock: simulate successful update
    const mockUser = getUserFromToken(token);
    if (mockUser) {
      if (typeof updatedData.firstName === 'string') mockUser.firstName = updatedData.firstName;
      if (typeof updatedData.lastName === 'string') mockUser.lastName = updatedData.lastName;
      if (typeof updatedData.userName === 'string') mockUser.userName = updatedData.userName;

      return {
        status: 200,
        message: 'User profile successfully updated (mock)',
        body: {
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          userName: mockUser.userName,
        }
      };
    }
    throw error;
  }
};