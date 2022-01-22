import { useState } from "react";

/*
Simple global state store that currently only works for single components subscribed to one entry.
It's purpose is to cache api requests. 
*/

class Store {
    private state: { [key: string]: any };
    private initialState: { [key: string]: any };

    constructor() {
        this.state = {};
        this.initialState = {};
    }

    init(initialState: { [key: string]: any }) {
        this.state = initialState;
        this.initialState = initialState;
    }

    getState(key: string) {
        return this.state[key];
    }

    setState(key: string, value: any) {
        this.state[key] = value;
    }

    clearState() {
        this.state = this.initialState;
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
