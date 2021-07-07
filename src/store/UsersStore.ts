import { action, makeObservable, observable, runInAction } from "mobx";
import { IRootStore } from ".";
import { IUser, IUsers, users } from "../api";
import { logError } from "../utils";

export interface IUsersStore {
  fetchAllUsers: () => void;
  fetchUserById: (id: number) => void;
  users: IUsers;
  user: IUser | undefined;
  loading: {
    users: boolean;
    user: boolean;
  };
}

export class UsersStore implements IUsersStore {
  rootStore: IRootStore;
  users: IUsers = [];
  user: IUser | undefined;
  loading = {
    users: false,
    user: false,
  };

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      users: observable,
      user: observable,
      loading: observable,
      fetchAllUsers: action.bound,
      fetchUserById: action.bound,
    });
  }

  fetchAllUsers() {
    this.loading.users = true;

    users
      .getAll()
      .then(({ data }) => {
        runInAction(() => {
          this.users = data;
          this.loading.users = false;
        });
      })
      .catch((e) => {
        logError.network(`Error fetching all users ${e}`);
        this.loading.users = false;
      });
  }

  fetchUserById(id: number) {
    this.loading.user = true;

    users
      .getById(id)
      .then(({ data }) => {
        runInAction(() => {
          this.user = data;
          this.loading.user = false;
        });
      })
      .catch((e) => {
        logError.network(`Error fetching a user by id ${e}`);
        this.loading.user = false;
      });
  }
}
