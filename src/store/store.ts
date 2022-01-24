import React, { useState, useEffect } from "react";

type updateState = React.Dispatch<React.SetStateAction<any>>;

class Store {
    private state: { [key: string]: any };
    private initialState: { [key: string]: any };
    public listeners: {
        [key: string]: Set<updateState>;
    } = {};

    constructor() {
        this.state = {};
        this.initialState = {};
        this.listeners = {};
    }

    init(initialState: { [key: string]: any }) {
        this.state = initialState;
        this.initialState = initialState;
        Object.keys(initialState).forEach((key) => {
            this.listeners[key] = new Set();
        });
    }

    getState(key: string, val?: any) {
        if (!this.state.hasOwnProperty(key)) {
            if (val) store.newKey(key, val);
            else
                throw new Error(
                    "You need to pass a value if the key hasn't been initialized"
                );
        }
        return this.state[key];
    }

    setState(key: string, value: any) {
        this.state[key] = value;
        this.listeners[key].forEach((callback: any) => callback(value));
    }

    newKey(key: string, value: string) {
        this.state[key] = value;
        this.listeners[key] = new Set<updateState>();
    }

    subcribe(key: string, callback: updateState) {
        this.listeners[key].add(callback);
    }

    unsubcribe(key: string, callback: updateState) {
        this.listeners[key].delete(callback);
    }

    clearState() {
        this.state = this.initialState;
        Object.keys(this.initialState).forEach((key) => {
            this.listeners[key] = new Set();
        });
    }
}

const useGlobalState = (key: string, val?: any) => {
    const state = store.getState(key, val);

    const [, listener] = useState();

    useEffect(() => {
        store.subcribe(key, listener);
        return () => store.unsubcribe(key, listener);
    }, []);

    const setState = (val: any) => {
        const oldState = store.getState(key);
        if (val !== oldState) store.setState(key, val);
    };

    return [state, setState];
};

const store = new Store();

export { store, useGlobalState };
