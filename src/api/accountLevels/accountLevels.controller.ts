import { NextFunction, Request, Response } from "express";
import * as AccountLevels from "./accountLevels.service";
import AccountLevel, { AccountLevelAttr } from "./accountLevels.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

export const findAll = async (
	req: Request,
	res: Response<AccountLevel[]>,
	next: NextFunction
) => {
	try {
		const settings = await AccountLevels.findAll();
		res.json(settings);
	} catch (error) {
		next(error);
	}
};

export const findAccountLevelById = async (
	req: Request<ParamsWithId>,
	res: Response<AccountLevel>,
	next: NextFunction
) => {
	try {
		const settings = await AccountLevels.findAccountLevelById(req.params.id);
		res.json(settings);
	} catch (error) {
		next(error);
	}
};

export const createAccountLevel = async (
	req: Request<{}, AccountLevel, AccountLevelAttr>,
	res: Response<AccountLevel>,
	next: NextFunction
) => {
	try {
		const settings = await AccountLevels.createAccountLevel(req.body);
		res.json(settings);
	} catch (error) {
		next(error);
	}
};

export const updateAccountLevel = async (
	req: Request<ParamsWithId, AccountLevelAttr, AccountLevel>,
	res: Response<AccountLevel>,
	next: NextFunction
) => {
	try {
		const settings = await AccountLevels.updateAccountLevel(
			req.params.id,
			req.body
		);
		res.json(settings);
	} catch (error) {
		next(error);
	}
};
