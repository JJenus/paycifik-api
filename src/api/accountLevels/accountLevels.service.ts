import AccountLevel, { AccountLevelAttr } from "./accountLevels.model";

export const findAll = async (): Promise<AccountLevel[]> => {
	try {
		let result = await AccountLevel.findAll();
		if (!result) {
			throw new Error("");
		}
		return result;
	} catch (error) {
		throw new Error("Unable to get settings");
	}
};

export const findAccountLevelById = async (id: string): Promise<AccountLevel> => {
	try {
		let result = await AccountLevel.findByPk(id);
		if (!result) {
			throw new Error("");
		}
		return result;
	} catch (error) {
		throw new Error("Unable to get settings");
	}
};

export const createAccountLevel = async (
	setting: AccountLevelAttr
): Promise<AccountLevel> => {
	try {
		const result = await AccountLevel.create(setting);

		return result;
	} catch (error) {
		throw new Error("Unable to create AccountLevel");
	}
};

export const updateAccountLevel = async (
	id: string,
	AccountLevelUpdate: AccountLevelAttr
): Promise<AccountLevel> => {
	let accountLevel;
	try {
		accountLevel = await AccountLevel.findByPk(id);

		if (!accountLevel) {
			throw new Error();
		}
	} catch (error) {
		throw new Error("Unauthorized AccountLevel update");
	}

	try {
		accountLevel.setAttributes(AccountLevelUpdate);
		await accountLevel.save();

		return accountLevel;
	} catch (error) {
		throw new Error("Unable to update AccountLevel");
	}
};
