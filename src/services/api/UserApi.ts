import { getDBConnection, getUserByCredentials, saveUser } from "../../persistence/sqlite";
import { User, UserResponse, UserSignUp } from "../../types";
import { loginUser, registerUser, updateUser } from "../accounting";

const userApi = {
    registerUser: async (user: UserSignUp): Promise<UserResponse> => {
        return registerUser(user); 
    },
    loginUser: async (email: string, password: string): Promise<UserResponse> => {
        return loginUser(email, password);
    },
    updateUser: async (user: User): Promise<UserResponse> => {
        return updateUser(user);
    }
};

export default userApi;