import { useCallback, useEffect, useState } from "react";
import { IPost, IUser } from "../../api";
import { usePostsStore, useUsersStore } from "../../hooks";

export interface IPostUi extends IPost {
  user: IUser;
}

export const useBusinessLogic = () => {
  const {
    fetchAllPosts,
    posts: postsFromStore,
    loading: postsLoading,
  } = usePostsStore();
  const {
    fetchAllUsers,
    users: usersFromStore,
    loading: usersLoading,
  } = useUsersStore();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<IPostUi>>([]);

  useEffect(() => {
    setLoading(true);
    fetchAllPosts();
    fetchAllUsers();
  }, [fetchAllPosts, fetchAllUsers]);

  const makePostsForUi = useCallback(() => {
    const postsUi = postsFromStore.map((post) => ({
      ...post,
      user: usersFromStore.find((user) => user.id === post.userId) as IUser,
    }));
    setPosts(postsUi);
    setLoading(false);
  }, [postsFromStore, usersFromStore]);

  useEffect(() => {
    const isReadyToMakePostsForUi =
      postsLoading.posts === false &&
      usersLoading.users === false &&
      postsFromStore.length > 0 &&
      usersFromStore.length > 0;

    if (isReadyToMakePostsForUi) {
      makePostsForUi();
    }
  }, [
    postsLoading,
    usersLoading,
    postsFromStore,
    usersFromStore,
    makePostsForUi,
  ]);

  return {
    posts,
    loading,
  };
};
