import GlobalError from "events/globalError";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

const timeoutErrorText =
    "timeout. Either the server or your internet connection is down.";

class API {
    private static _headers: Headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    private static _baseUrl: string = process.env.REACT_APP_BASE_URL
        ? process.env.REACT_APP_BASE_URL
        : "http://localhost:80";

    private static async Request(
        url: string,
        method: Method,
        body?: Object
    ): Promise<{ [key: string]: any }> {
        const controller = new AbortController();

        setTimeout(() => {
            controller.abort();
            //GlobalError.emit(timeoutErrorText);
        }, 5000);

        const res = await fetch(`${this._baseUrl}/${url}`, {
            method: method,
            headers: this._headers,
            body: JSON.stringify(body),
            credentials: "include",
            signal: controller.signal,
        });

        const resBody = await res.json();

        if (res.status >= 500) {
            GlobalError.emit(timeoutErrorText);
        }

        if (!res.ok) {
            throw new Error(resBody.message || "error");
        }

        return resBody.data;
    }

    static async GET(url: string): Promise<{ [key: string]: any }> {
        return API.Request(url, "GET");
    }

    static async POST(
        url: string,
        body: Object
    ): Promise<{ [key: string]: any }> {
        return API.Request(url, "POST", body);
    }

    static async PUT(url: string, body: Object) {
        return API.Request(url, "PUT", body);
    }
    static async Delete(url: string) {
        return API.Request(url, "DELETE");
    }
}

export default API;
