import { useContext } from "react";
import { RootStoreContext } from "../../store";

export const useStores = () => useContext(RootStoreContext);