import { useStores } from "./useStores"

export const usePostsStore = () => {
  const stores = useStores();

  return stores.postsStore
}