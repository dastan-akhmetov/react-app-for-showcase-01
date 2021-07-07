import { createContext } from 'react';

import { RootStore, IRootStore } from '.';

export const store = new RootStore();
export const RootStoreContext = createContext<IRootStore>(store);
