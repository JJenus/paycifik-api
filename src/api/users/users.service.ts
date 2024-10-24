// import { debugLogger } from "../../common/logger";
import { ZodError, ZodIssue, ZodIssueCode } from "zod";
import User, { UserAttributes, UserUpdateAttributes } from "./users.model";
import bcrypt from "bcrypt";
import * as accountService from "../accounts/account.service";

export async function findAll(): Promise<User[]> {
	try {
		const users = await User.findAll();
		return users;
	} catch (error) {
		// console.log(error);
		console.log("Unable to find users");
		throw new Error("Unable to find users");
	}
}

export async function createUser(
	userData: UserAttributes
): Promise<Partial<User>> {
	// Additional checks
	let userExists: User | null = null;

	try {
		userExists = await User.findOne({ where: { email: userData.email } });
	} catch (error) {
		// console.log(error);
	}

	if (userExists !== null) {
		// console.log("Email already exists");
		const issue: ZodIssue = {
			message: "Email already exists",
			code: ZodIssueCode.custom,
			path: [],
		};

		throw new ZodError([issue]);
	}

	try {
		const passwordHash = await bcrypt.hash(userData.password, 10);

		userData.password = passwordHash;
		const user = await User.create(userData);
		return user.toJSON();
	} catch (error) {
		console.log(error);
		throw new Error("Failed to create user");
	}
}

export async function findUserByEmail(email: string): Promise<User> {
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			throw new Error();
		}
		return user;
	} catch (error) {
		// console.log(error);
		throw new Error("User not found");
	}
}

export async function findUserById(userId: string): Promise<User> {
	try {
		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error();
		}
		return user;
	} catch (error) {
		throw new Error("User not found");
	}
}

export async function findUserByAccountNumber(
	accountNumber: number
): Promise<User> {
	try {
		const account = await accountService.findUserByAccountNumber(
			accountNumber
		);
		const user = await User.findByPk(account.userId);
		if (!user) {
			throw new Error();
		}
		return user;
	} catch (error) {
		throw new Error("User not found");
	}
}

export async function updateUser(
	userId: string,
	userData: Partial<UserAttributes>
): Promise<Partial<User>> {
	// console.log("\n\nIT GETS HERE\n\n")
	// Retrieve the user
	const user = await findUserById(userId);

	if (!user) {
		throw new Error("User not found");
	}

	// Not allowed to update password here
	if (userData?.password) {
		throw new Error("Attempt to change password");
	}

	const filteredUserData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value != null)
    );
	

	console.log(userData, user.toJSON());

	try {
		await user.update(filteredUserData);
		return user;
	} catch (error) {
		console.log(error);
		throw new Error("Failed to update user");
	}
}

export async function deleteUser(userId: string): Promise<void> {
	let user;

	try {
		user = await User.findByPk(userId);
		if (!user) {
			throw new Error();
		}
	} catch (error) {
		throw new Error("User not found");
	}

	try {
		await user?.destroy();
	} catch (error) {
		throw new Error("Failed to delete user");
	}
}
