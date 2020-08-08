import Router from "next/router";
import { isServer } from "./util";

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
  if (!isServer) {
    if (errorCode === 401) {
      const { pathname } = Router;
      if (pathname === "/") {
        Router.push("/login");
      }
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
        if (res.status >= 200 && res.status < 300) {
          return res.text();
        }

        throw res.status;
      })
      .then(data => {
        return Promise.resolve(data ? JSON.parse(data) : {});
      })
      .catch(errCode => {
        handleError(errCode);
        return Promise.reject(errCode);
      }) ?? {}
  );
}

export async function get(url: string, options?: RequestInit) {
  const finalOptions: RequestInit = {
    method: "GET",
    ...defaultOptions,
    ...(options && { ...options })
  };

  return (
    (await fetch(url, finalOptions)
      .then(res => {
        if (res.status === 200) {
          return res.text();
        }

        throw res.status;
      })
      .then(data => {
        return Promise.resolve(data ? JSON.parse(data) : {});
      })
      .catch(errCode => {
        handleError(errCode);
        return Promise.reject(errCode);
      })) ?? {}
  );
}

export async function put(url: string, body?: string) {
  const options: RequestInit = {
    method: "PUT",
    ...defaultOptions,
    body
  };

  return (
    (await fetch(url, options)
      .then(res => {
        if (res.status === 200) {
          return res.text();
        }

        throw res.status;
      })
      .then(data => {
        return Promise.resolve(data ? JSON.parse(data) : {});
      })
      .catch(errCode => {
        handleError(errCode);
        return Promise.reject(errCode);
      })) ?? {}
  );
}

export async function deleteFetch(url: string) {
  const options: RequestInit = {
    method: "DELETE",
    ...defaultOptions
  };

  return (
    (await fetch(url, options)
      .then(res => {
        if (res.status === 204) {
          return res.text();
        }

        throw res.status;
      })
      .then(data => {
        return Promise.resolve(data ? JSON.parse(data) : {});
      })
      .catch(errCode => {
        handleError(errCode);
      })) ?? {}
  );
}
