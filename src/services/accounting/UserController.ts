import { getUserByCredentials, getUserByEmail, getUserById, getUserDBConnection, saveUser } from "../../persistence/sqlite";
import { UserResponse, UserSignUp } from "../../types";

export const registerUser = async (user: UserSignUp): Promise<UserResponse> => {
    if (user.name === '' ||
        user.email === '' ||
        user.password === '' ||
        user.phoneNumber === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();

    const userExists = await getUserByEmail(db, user.email);
    if (userExists.data != null) {
        return { error: 'User already exists' } as UserResponse;
    }

    const userId = await saveUser(db, user);
    if(!userId) {
        return {error: 'Failed to register user'} as UserResponse;
    }

    return getUserById(db, userId.toString());
}

export const loginUser = async (email: string, password: string): Promise<UserResponse> => {
    if (email === '' || password === '') {
        return { error: 'Invalid request' } as UserResponse;
    }

    const db = await getUserDBConnection();

    return getUserByCredentials(db, email, password);
}

export const updateUser = (user: User): Promise<UserResponse> => {

}