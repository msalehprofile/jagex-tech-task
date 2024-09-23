export type NewGameForm = {
  symbol: string;
  faction: string;
};

export type AgentDetails = {
  accountID: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
};

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
};

export type AgentContract = {
  id: string;
  factionSymbol: string;
  type: string;
  terms: {
    deadline: string;
    payment: {
      onAccept: number;
      onFulfilleD: number;
    };
    deliver: [
      {
        tradeSymbol: string;
        destinationSymbol: string;
        unitsRequired: number;
        unitsFulfilled: number;
      }
    ];
  };
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
};

export type ShipyardLocations = {
  systemSymbol: string;
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: [];
  traits: [
    {
      symbol: string;
      name: string;
      description: string;
    }
  ];
  modifiers: [];
  chart: {
    submittedBy: string;
    submittedOn: string;
  };
  faction: {
    symbol: string;
  };
  orbits: string;
  isUnderConstruction: boolean;
};

export type AvailableShips = {
  modificationFee: number;
  shipTypes: [
    {
      type: string;
    }
  ];
  symbol: string;
};

export type AgentAndShipDetails = {
  agent: {
    accountId: string;
    symbol: string;
    headquarters: string;
    credits: number;
    startingFaction: string;
    shipCount: number;
  };
  ship: {
    symbol: string;
    nav: {
      systemSymbol: string;
      waypointsSymbol: string;
      route: {};
      status: string;
      flightMode: string;
    };
    crew: {
      current: number;
      capacity: number;
      require: number;
      rotation: string;
      morale: number;
      wages: 0;
    };
    fuel: {
      current: number;
      capacity: number;
      consumed: {};
    };
    cooldown: {
      shipSymbol: string;
      totalSeconds: number;
      remainingSeconds: number;
    };
    frame: {
      symbol: string;
      name: string;
      description: string;
      moduleSlots: number;
      mountingPoints: number;
      fuelCapacity: number;
      condition: number;
      integrity: number;
      requirements: {};
    };
    reactor: {
      symbol: string;
      name: string;
      description: string;
      condition: number;
      integrity: number;
      powerOutput: number;
      requirements: {};
    };
    engine: {
      symbol: string;
      name: string;
      description: string;
      condition: number;
      integrity: number;
      speed: number;
      requirements: {};
    };
    modules: [{}, {}];
    mounts: [{}];
    registration: {
      name: string;
      factionSymbol: string;
      role: string;
    };
    cargo: {
      capacity: number;
      units: number;
      inventory: [];
    };
  };
  transaction: {
    shipSymbol: string;
    shipType: string;
    waypointSymbol: string;
    agentSymbol: string;
    price: number;
    timestamp: string;
  };
};
