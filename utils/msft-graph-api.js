import axios from "axios";

export function getEvents(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://graph.microsoft.com/v1.0/users/RENCI_healdataca.rmb@ad.unc.edu/calendar/events?$top=50`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        resolve(res.data.value);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
}

export function getEvent(token, id) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://graph.microsoft.com/v1.0/users/RENCI_healdataca.rmb@ad.unc.edu/calendar/events/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        // console.log(res)
        resolve(res.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
}

export async function getAuthorizationToken() {
  try {
    const response = await axios.get('/api/getToken');
    return response.data.token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null; // Return null or handle the error appropriately
  }
}

export async function fetchEvents(token) {
  let event = await getEvents(token);
  return event;
}
