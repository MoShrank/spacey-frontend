import { DeckI } from "types/deck";
import API from "./api";

export const getDecks = async (): Promise<Array<DeckI>> => {
    try {
        return (await API.GET(`deck`)) as Array<DeckI>;
    } catch (error) {
        throw error;
    }
};

export const createDeck = async (deck: DeckI): Promise<DeckI> => {
    try {
        return (await API.POST(`deck`, deck)) as DeckI;
    } catch (error) {
        throw error;
    }
};
