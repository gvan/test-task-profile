import { getDBConnection, getUserByCredentials, saveUser } from "../../persistence/sqlite";
import { User, UserResponse, UserSignUp } from "../../types";
import { loginUser, registerUser, updateUser } from "../accounting";
import { getUser, updateUserAvatar } from "../accounting/UserController";

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
    updateUserInfo: async (user: User): Promise<UserResponse> => {
        return updateUser(user);
    },
    updateUserAvatar: async (id: string, avatar: string): Promise<UserResponse> => {
        return updateUserAvatar(id, avatar);
    }
};

export default userApi;