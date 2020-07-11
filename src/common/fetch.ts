import Router from "next/router";

const defaultOptions: RequestInit = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Cache-Control": "no-cache"
  }
};

function handleError(errorCode: number) {
  if (errorCode === 401) {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/login");
    }
  }
}

export async function post(url: string, body?: string) {
  const options: RequestInit = {
    method: "POST",
    ...defaultOptions,
    body
  };

  return (
    fetch(url, options)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.json());
        }

        throw res.status;
      })
      .catch(errCode => {
        handleError(errCode);
      }) ?? {}
  );
}

export async function get(url: string) {
  const options: RequestInit = {
    method: "GET",
    ...defaultOptions
  };

  return (
    (await fetch(url, options)
      .then(res => {
        if (res.status === 200) {
          return Promise.resolve(res.json());
        }

        throw res.status;
      })
      .catch(errCode => {
        handleError(errCode);
      })) ?? {}
  );
}
