import { SQLiteDatabase, enablePromise, openDatabase } from "react-native-sqlite-storage";
import { User, UserResponse, UserSignUp } from "../../types";

const DB_NAME = 'accounting.db';
const TABLE_NAME = 'users';

enablePromise(true);

export const getUserDBConnection = async () => {
    return openDatabase({ name: DB_NAME, location: 'default' });
};

export const createUserTables = async (db: SQLiteDatabase) => {
    const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(64) NOT NULL,
        email VARCHAR(64) NOT NULL,
        password VARCHAR(32) NOT NULL,
        phone_number VARCHAR(32) NOT NULL,
        position VARCHAR(64),
        skype VARCHAR(64),
        avatar TEXT
    );`;
    await db.executeSql(query);
    console.log(`createTables`);
};

export const saveUser = async (db: SQLiteDatabase, user: UserSignUp): Promise<number> => {
    const query = `INSERT INTO ${TABLE_NAME} 
        (name, email, password, phone_number) VALUES 
        ('${user.name}', '${user.email}', '${user.password}', 
            '${user.phoneNumber}');`;
    const results = await db.executeSql(query);
    if (results.length > 0) {
        if (results[0].rowsAffected === 1) {
            return results[0].insertId;
        }
    }
    return null;
}

export const updateUserById = async (db: SQLiteDatabase, user: User): Promise<boolean> => {
    try {
        const query = `UPDATE ${TABLE_NAME} SET name='${user.name}', email='${user.email}', 
            phone_number='${user.phoneNumber}', position='${user.position}', 
            skype='${user.skype}', avatar='${user.avatar}' WHERE user_id='${user.id}';`;
        const results = await db.executeSql(query);
        if (results.length > 0 && results[0].rowsAffected === 1) {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

export const updateUserAvatarById = async(db: SQLiteDatabase, id: string, avatar: string): Promise<boolean> => {
    try {
        const query = `UPDATE ${TABLE_NAME} SET avatar='${avatar}' WHERE user_id='${id}';`;
        const results = await db.executeSql(query);
        if(results.length > 0 && results[0].rowsAffected === 1) {
            return true;
        }
        return false;
    } catch(err) {
        return false;
    }
}

export const getUserById = async (db: SQLiteDatabase, id: string): Promise<UserResponse> => {
    try {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE user_id='${id}';`;
        const results = await db.executeSql(query);
        if (results.length > 0 && results[0].rows.length > 0) {
            const user = results[0].rows.item(0);
            return { data: mapDBUserToUser(user) } as UserResponse;
        }
        return { error: 'UserId is incorrect' } as UserResponse;
    } catch (err) {
        return { error: 'Internal error' } as UserResponse;
    }
}

export const getUserByEmail = async (db: SQLiteDatabase, email: string): Promise<UserResponse> => {
    try {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE email='${email}'`;
        const results = await db.executeSql(query);
        if (results.length > 0 && results[0].rows.length > 0) {
            const user = results[0].rows.item(0);
            return { data: mapDBUserToUser(user) } as UserResponse;
        }
        return { error: 'Email is incorrect' } as UserResponse;
    } catch (err) {
        return { error: 'Internal error' } as UserResponse;
    }
}

export const getUserByCredentials = async (db: SQLiteDatabase, email: string, password: string): Promise<UserResponse> => {
    try {
        const query = `SELECT * FROM ${TABLE_NAME} WHERE email='${email}' AND password='${password}';`;
        const results = await db.executeSql(query);
        if (results.length > 0) {
            if (results[0].rows.length > 0) {
                const user = results[0].rows.item(0);
                return { data: mapDBUserToUser(user) } as UserResponse;
            }
        }
        return { error: 'Incorrect email or password' } as UserResponse;
    } catch (err) {
        return { error: 'Internal error' } as UserResponse;
    }
}

const mapDBUserToUser = (user): User => {
    return {
        id: user.user_id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone_number,
        position: user.position,
        skype: user.skype,
        avatar: user.avatar,
    } as User;
}