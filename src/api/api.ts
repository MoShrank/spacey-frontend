type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

class API {
    private static _headers: Headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    private static _baseUrl: string = process.env.BASE_URL
        ? process.env.BASE_URL
        : "http://localhost:8080/";

    static async GET(url: string): Promise<Object> {
        return fetch(this._baseUrl + url, {
            method: "GET",
            headers: this._headers,
        });
    }

    static async POST(url: string, body: Object): Promise<Response> {
        return fetch(this._baseUrl + url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body),
        });
    }

    /*
    static async Put(url, headers, body) {
        return new Request("PUT", url, headers, body);
    }
    static async Delete(url, headers, body) {
        return new Request("DELETE", url, headers, body);
    }
    */
}

export default API;
