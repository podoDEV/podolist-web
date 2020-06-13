const defaultOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Cache-Control": "no-cache"
  }
};

export async function post(url: string, body?: string) {
  const options: RequestInit = {
    method: "POST",
    ...defaultOptions,
    body
  };

  return fetch(url, options)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      }
    })
    .catch(err => {
      console.error(err);
    });
}

export async function get(url: string) {
  const options: RequestInit = {
    method: "GET",
    ...defaultOptions
  };

  return fetch(url, options)
    .then(res => {
      if (res.status === 200) {
        return Promise.resolve(res.json());
      }
    })
    .catch(err => {
      console.error(err);
    });
}