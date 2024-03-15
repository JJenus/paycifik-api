import sequelize from "../../common/db";
import { Model, DataTypes } from "sequelize";
import zod, { number } from "zod";
import UserAccountStatus from "./account.status";
import AccountStatus from "./account.status";
import { Currency } from "../../interfaces/Currency";

export const AccountAttr = zod.object({
	id: zod.string().uuid("Invalid Account Id").optional(),
	userId: zod.string().uuid(),
	currencyId: zod.string(),
	amount: zod.number(),
	accountNumber: zod.number(),
	accountLevel: zod.number(),
	status: zod.nativeEnum(UserAccountStatus),
});

export const updateBalance = zod.object({
	email: zod.string(),
	accountNumber: zod.number().optional(),
	amount: zod.number(),
});

export type updateBalance = zod.infer<typeof updateBalance>;

export const updateAccount = zod.object({
	id: zod.string().uuid("Invalid Account Id").optional(),
	userId: zod.string().uuid(),
	currencyId: zod.string().optional(),
	amount: zod.number().optional(),
	accountNumber: zod.number().optional(),
	accountLevel: zod.number().optional(),
	status: zod.nativeEnum(UserAccountStatus).optional(),
});

export type updateAccount = zod.infer<typeof updateAccount>;

export type AccountAttr = zod.infer<typeof AccountAttr>;

class Account extends Model<AccountAttr, AccountAttr> implements AccountAttr {
	declare id: string;
	declare userId: string;
	declare currencyId: string;
	declare amount: number;
	declare status: AccountStatus;
	declare currency: Currency;
	declare accountNumber: number;
	declare accountLevel: number;

}

Account.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
		},
		currencyId: {
			type: DataTypes.STRING,
		},
		amount: {
			type: DataTypes.BIGINT,
		},
		accountNumber: {
			type: DataTypes.BIGINT,
		},
		accountLevel: {
			type: DataTypes.INTEGER,
			defaultValue: 1
		},
		status: {
			type: DataTypes.ENUM(...Object.values(UserAccountStatus)),
			defaultValue: UserAccountStatus.ACTIVE,
		},
	},
	{
		sequelize,
		paranoid: true,
		modelName: "Account",
	}
);

if (process.env.NODE_ENV !== "production") {
	Account.sync({ alter: true });
}

export default Account;
