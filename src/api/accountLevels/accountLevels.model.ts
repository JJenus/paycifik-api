import { DataTypes, Model } from "sequelize";
import zod from "zod";
import sequelize from "../../common/db";

export const AccountLevelAttr = zod.object({
	id: zod.string().uuid().optional(),
	title: zod.string().min(2),
	dailyLimit: zod.number(),
	maxBalanceLimit: zod.number(),
	accountLevel: zod.number(),
});

export type AccountLevelAttr = zod.infer<typeof AccountLevelAttr>;

class AccountLevel extends Model<AccountLevelAttr> implements AccountLevelAttr {
	declare id: string;
	declare title: string;
	declare dailyLimit: number;
	declare maxBalanceLimit: number;
	declare accountLevel: number;
}

AccountLevel.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		title: {
			type: DataTypes.STRING,
		},
		dailyLimit: {
			type: DataTypes.BIGINT,
		},
		maxBalanceLimit: {
			type: DataTypes.BIGINT,
		},
		accountLevel: {
			type: DataTypes.INTEGER,
		},
	},
	{
		sequelize,
		paranoid: true,
		modelName: "AccountLevel",
	}
);

AccountLevel.sync({ alter: true });

export default AccountLevel;
