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
export const refreshBypassURL = [
  "/api/user/logout/blacklist/",
  "/api/user/create/",
];
export const header = {
  "Access-Control-Allow-Or`igin": "*",
  Authorization: `JWT ${localStorage.getItem("access_token")}` || null,
  "Content-Type": "application/json",
  accept: "application/json",
};
export const headerNoAuth = {
  "Access-Control-Allow-Or`igin": "*",
  "Content-Type": "application/json",
  accept: "application/json",
};

const fetchHeaders = (url) => {
  if (refreshBypassURL.includes(url)) {
    return headerNoAuth;
  }

  return header;
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
    headers: fetchHeaders(url),
    body: JSON.stringify({ refresh: refreshToken }),
  };
  const response = await fetch(url, requestOptions)
    .then(handleResponse)
    .then((res) => {
      localStorage.setItem("access_token", res.access);
      localStorage.setItem("refresh_token", res.refresh);
      header.Authorization = `JWT ${res.access}`;
    });
  return response;
}

async function get(url) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "GET",
    headers: fetchHeaders(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function patch(url, body) {
  if (tokenExpired()) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "PATCH",
    headers: fetchHeaders(url),
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

async function post(url, body) {
  if (tokenExpired() && refreshBypassURL.includes(url) === false) {
    await tokenRefresh();
  }
  const requestOptions = {
    method: "POST",
    headers: fetchHeaders(url),
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
    headers: fetchHeaders(url),
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
    headers: fetchHeaders(url),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

export const fetchWrapper = {
  get,
  patch,
  post,
  put,
  delete: del,
};

export default fetchWrapper;
