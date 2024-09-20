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