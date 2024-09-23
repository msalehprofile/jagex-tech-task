export type NewGameForm = {
    symbol: string;
    faction: string;
}

export type AgentDetails = {
    accountID: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
}

export type AgentWaypointLocation = {
    systemSymbol: string;
    symbol: string;
    type: string;
    x: number;
    y: number;
    orbitals: [];
    traits: [];
    modifiers: [];
    chart: {};
    faction: {};
    isUnderConstruction: boolean;
}

export type AgentContract = {
    id: string;
    factionSymbol: string;
    type: string;
    terms: {
        deadline: string;
        payment: {
            onAccept: number;
            onFulfilleD: number
        },
        deliver: [
            {
                tradeSymbol: string;
                destinationSymbol: string;
                unitsRequired: number;
                unitsFulfilled: number
            }
        ]
    },
    accepted: boolean;
    fulfilled: boolean;
    expiration: string;
    deadlineToAccept: string;
}