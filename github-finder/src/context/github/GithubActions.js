import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// SearchUsers - to get the search data of users
export const searchUsers = async (text) => {
  //   setLoading();

  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;

  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });

  //   const { items } = await response.json();

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: items,
  //   });

  //   return items;
};

// Get single User
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });

  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();

    // dispatch({
    //   type: "GET_USER",
    //   payload: data,
    // });

    return data;
  }
};

// Get User Repos
export const getRepos = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  const data = await response.json();

  //   dispatch({
  //     type: "GET_REPOS",
  //     payload: data,
  //   });

  return data;
};

// // Clear User Search
// export const clearSearch = () => {
//   dispatch({
//     type: "CLEAR_SEARCH",
//     payload: [],
//   });
// };
