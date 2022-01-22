class API {
    private static _headers: Headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });
    private static _baseUrl: string = process.env.REACT_APP_BASE_URL
        ? process.env.REACT_APP_BASE_URL
        : "http://localhost:8080/";

    static async GET(url: string): Promise<{ [key: string]: any }> {
        const res = await fetch(`${this._baseUrl}/${url}`, {
            method: "GET",
            headers: this._headers,
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const resBody = await res.json();
        return resBody.data;
    }

    static async POST(
        url: string,
        body: Object
    ): Promise<{ [key: string]: any }> {
        const res = await fetch(`${this._baseUrl}/${url}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const resBody = await res.json();
        return resBody.data;
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
