import React, { useEffect, useState } from "react";

class Store {
	private state: Record<string, unknown> = {};
	private initialState: Record<string, unknown> = {};
	public listeners: Record<
		string,
		// eslint-disable-next-line
		Set<React.Dispatch<React.SetStateAction<any>>>
	> = {};

	init(initialState: Record<string, unknown>) {
		this.state = initialState;
		this.initialState = initialState;
		Object.keys(initialState).forEach(key => {
			this.listeners[key] = new Set();
		});
	}

	getState<T>(key: string, val?: T) {
		if (!Object.prototype.hasOwnProperty.call(this.state, key)) {
			if (val) store.newKey(key, val);
			else
				throw new Error(
					"You need to pass a value if the key hasn't been initialized",
				);
		}
		return this.state[key];
	}

	setState<T>(key: string, value: T) {
		this.state[key] = value;
		this.listeners[key].forEach(
			(callback: React.Dispatch<React.SetStateAction<T>>) => callback(value),
		);
	}

	newKey<T>(key: string, value: T) {
		this.state[key] = value;
		this.listeners[key] = new Set<React.Dispatch<React.SetStateAction<T>>>();
	}

	subcribe<T>(key: string, callback: React.Dispatch<React.SetStateAction<T>>) {
		this.listeners[key].add(callback);
	}

	unsubcribe<T>(key: string, callback: React.Dispatch<React.SetStateAction<T>>) {
		this.listeners[key].delete(callback);
	}

	clearState() {
		this.state = this.initialState;
		Object.keys(this.initialState).forEach(key => {
			this.listeners[key] = new Set();
		});
	}
}

const useGlobalState = <T>(key: string, val?: T): [T, (val: T) => void] => {
	const state = store.getState(key, val);

	const [, listener] = useState<T>();

	useEffect(() => {
		store.subcribe(key, listener);
		return () => store.unsubcribe(key, listener);
	}, []);

	const setState = (val: T) => {
		const oldState = store.getState(key);
		if (val !== oldState) store.setState(key, val);
	};

	return [state as T, setState as (val: T) => void];
};

const store = new Store();

export { store, useGlobalState };
