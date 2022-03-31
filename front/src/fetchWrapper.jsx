function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = data || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export const fetchHeaders = {
  "Access-Control-Allow-Origin": "*",
  Authorization: `JWT ${localStorage.getItem("access_token")}` || null,
  "Content-Type": "application/json",
  accept: "application/json",
};

function tokenExpired() {
  if (
    localStorage.getItem("access_token") !== "undefined" &&
    localStorage.getItem("access_token") != null
  ) {
    const accessToken = localStorage.getItem("access_token");
    const tokenParts = JSON.parse(atob(accessToken.split(".")[1]));
    // exp date in token is expressed in seconds, while now() returns milliseconds:
    const now = Math.ceil(Date.now() / 1000);
    if (tokenParts.exp < now) {
      return true;
    }
  }
  return false;
}

async function tokenRefresh() {
  const refreshToken = localStorage.getItem("refresh_token");
  const url = "/api/token/refresh/";
  const requestOptions = {
    method: "POST",
    headers: fetchHeaders,
    body: JSON.stringify({ refresh: refreshToken }),
  };
  const response = await fetch(url, requestOptions)
    .then(handleResponse)
    .then((res) => {
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      fetchHeaders.Authorization = `JWT ${res.access}`;
    });
  return response;
}

async function get(url) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "GET",
    headers: fetchHeaders,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function post(url, body) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "POST",
    headers: fetchHeaders,
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function put(url, body) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "PUT",
    headers: fetchHeaders,
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function del(url) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "DELETE",
    headers: fetchHeaders,
  };
  return fetch(url, requestOptions).then(handleResponse);
}

export const fetchWrapper = {
  get,
  post,
  put,
  delete: del,
};

export default fetchWrapper;
