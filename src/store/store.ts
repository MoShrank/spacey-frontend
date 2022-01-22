import { useState } from "react";

/*
Simple global state store that currently only works for single components subscribed to one entry.
It's purpose is to cache api requests. 
*/

class Store {
    private state: { [key: string]: any };

    constructor() {
        this.state = {};
    }

    init(initialState: { [key: string]: any }) {
        this.state = initialState;
    }

    getState(key: string) {
        return this.state[key];
    }

    setState(key: string, value: any) {
        this.state[key] = value;
    }
}

const useGlobalState = (key: string) => {
    const state = store.getState(key);

    const [, setStatePre] = useState(state);

    const setState = (val: any) => {
        setStatePre(val);
        store.setState(key, val);
    };

    return [state, setState];
};

const store = new Store();

export { store, useGlobalState };
