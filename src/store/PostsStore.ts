import { action, makeObservable, observable, runInAction } from "mobx";
import { IRootStore } from ".";
import { IPost, IPosts, posts } from "../api";
import { logError } from "../utils";

export interface IPostsStore {
  fetchAllPosts: () => void;
  fetchPostById: (id: number) => void;
  posts: IPosts;
  post: IPost | undefined;
  loading: {
    posts: boolean;
    post: boolean;
  };
}

export class PostsStore implements IPostsStore {
  rootStore: IRootStore;
  posts: IPosts = [];
  post: IPost | undefined;
  loading = {
    posts: false,
    post: false,
  };

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      posts: observable,
      post: observable,
      loading: observable,
      fetchAllPosts: action.bound,
      fetchPostById: action.bound,
    });
  }

  fetchAllPosts() {
    runInAction(() => {
      this.loading.posts = true;
    });

    posts
      .getAll()
      .then(({ data }) => {
        setTimeout(() => {
          runInAction(() => {
            this.posts = data;
            this.loading.posts = false;
          });
        }, 700);
      })
      .catch((e) => {
        logError.network(`Error fetching all posts ${e}`);
        this.loading.posts = false;
      });
  }

  fetchPostById(id: number) {
    this.loading.post = true;

    posts
      .getById(id)
      .then(({ data }) => {
        setTimeout(() => {
          runInAction(() => {
            this.post = data;
            this.loading.post = false;
          });
        }, 700);
      })
      .catch((e) => {
        logError.network(`Error fetching a post by id ${e}`);
        this.loading.post = false;
      });
  }
}
