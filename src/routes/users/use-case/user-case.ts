import { user } from "../users.types";
import { UserRepo } from "./user.repo";

export const CreateUser = (data: user) => {
  const userRepo = UserRepo();
  return userRepo.createUser(data);
};

export const GetAllUsers = () => {
  const userRepo = UserRepo();
  return userRepo.getAllUsers();
};

export const GetUserById = (id: string) => {
  const userRepo = UserRepo();
  return userRepo.getUserById(id);
};

export const UpdateUser = (id: string, data: user) => {
  const userRepo = UserRepo();
  return userRepo.updateUser(id, data);
};

export const DeleteUser = (id: string) => {
  const userRepo = UserRepo();
  return userRepo.deleteUser(id);
};
