import { useStores } from "./useStores"

export const useUsersStore = () => {
  const stores = useStores();

  return stores.usersStore;
}