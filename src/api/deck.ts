import { DeckI } from "types/deck"
import API from "./api"

export const getDecks = async(userID: string): Promise<Array<DeckI>> => {
    try {
        return await API.GET(`decks`) as Array<DeckI>;
    } catch(error) {
        throw error;
    }
    
} 