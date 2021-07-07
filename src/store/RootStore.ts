import { IPostsStore, IUsersStore, PostsStore, UsersStore } from ".";

export interface IRootStore {
  postsStore: IPostsStore;
  usersStore: IUsersStore;
}

export class RootStore {
  postsStore: IPostsStore;
  usersStore: IUsersStore;

  constructor() {
    this.postsStore = new PostsStore(this);
    this.usersStore = new UsersStore(this);
  }
}
