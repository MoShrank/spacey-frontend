import { DeckI } from "types/deck"

export const getDecks = async(userID: string): Promise<Array<DeckI>> => {
    return [
        {
            id: "test",
            name: "Test",
            description: "Test",
            color: "black",
            lastLearned: Date.now()
        }
    ]
} 