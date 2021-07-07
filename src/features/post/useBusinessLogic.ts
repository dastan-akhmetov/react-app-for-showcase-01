import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IPost, IUser } from "../../api";

import { usePostsStore, useUsersStore } from "../../hooks";
import { IPostUi } from "../posts/useBusinessLogic";

export const useBusinessLogic = () => {
  const {
    fetchPostById,
    post: postFromStore,
    loading: postsLoading,
  } = usePostsStore();
  const {
    fetchUserById,
    user: userFromStore,
    loading: usersLoading,
  } = useUsersStore();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<IPostUi>({} as IPostUi);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPostById(parseInt(postId));
  }, [fetchPostById, postId]);

  useEffect(() => {
    if (postsLoading.post === false && !!postFromStore?.id) {
      fetchUserById(postFromStore.userId);
    }
  }, [postFromStore, postsLoading, fetchUserById]);

  const makePostForUi = useCallback(() => {
    const postUi: IPostUi = {
      ...(postFromStore as IPost),
      user: userFromStore as IUser,
    };
    setPost(postUi);
    setLoading(false);
  }, [postFromStore, userFromStore]);

  useEffect(() => {
    const isReadyToMakePostForUi =
      postsLoading.post === false &&
      usersLoading.user === false &&
      !!userFromStore?.id &&
      !!postFromStore?.id;

    if (isReadyToMakePostForUi) {
      makePostForUi();
    }
  }, [userFromStore, usersLoading, postFromStore, makePostForUi, postsLoading]);

  return {
    post,
    loading,
  };
};
