import { Router } from "express";
import * as accountController from "./account.controller";
import { validateRequest } from "../../common/middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { updateAccount, updateBalance } from "./account.model";

const router = Router();

router.get(
	"/:id",
	validateRequest({ params: ParamsWithId }),
	accountController.findAccount
);

router.post(
	"/",
	validateRequest({ body: updateBalance }),
	accountController.updateBalance
);

router.put(
	"/",
	validateRequest({ body: updateAccount }),
	accountController.updateUserAccount
);

// router.delete(
// 	"/:id",
// 	validateRequest({ params: ParamsWithId }),
// 	accountController.deleteAccount
// );

export default router;
