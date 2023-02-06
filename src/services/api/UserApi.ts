import { getDBConnection, getUserByCredentials, saveUser } from "../../persistence/sqlite";
import { User, UserResponse, UserSignUp } from "../../types";
import { loginUser, registerUser, updateUser } from "../accounting";
import { getUser } from "../accounting/UserController";

const userApi = {
    registerUser: async (user: UserSignUp): Promise<UserResponse> => {
        return registerUser(user); 
    },
    checkVerificationCode: (phone: string, code: string): Promise<boolean> => {
        return true;
    },
    loginUser: async (email: string, password: string): Promise<UserResponse> => {
        return loginUser(email, password);
    },
    getUser: async (id: string): Promise<UserResponse> => {
        return getUser(id);
    },
    updateUser: async (user: User): Promise<UserResponse> => {
        return updateUser(user);
    }
};

export default userApi;