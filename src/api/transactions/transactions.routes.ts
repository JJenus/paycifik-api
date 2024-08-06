import { Router } from "express";
import * as transactionController from "./transactions.controller";
import { validateRequest } from "../../common/middlewares";
import { TransactionAttr } from "./transactions.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

router.get(
	"/:id",
	validateRequest({ params: ParamsWithId }),
	transactionController.findUserTransactions
);

router.post(
	"/",
	validateRequest({ body: TransactionAttr }),
	transactionController.createTransaction
);

router.put(
	"/:id",
	validateRequest({ body: TransactionAttr }),
	transactionController.updateTransaction
);

export default router;
