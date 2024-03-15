import { Router } from "express";
import * as AccountLevelController from "./accountLevels.controller";
import { validateRequest } from "../../common/middlewares";
import { AccountLevelAttr } from "./accountLevels.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

router.get("/", AccountLevelController.findAll);
router.get(
	"/:id",
	validateRequest({ params: ParamsWithId }),
	AccountLevelController.findAccountLevelById
);
router.post(
	"/",
	validateRequest({ body: AccountLevelAttr }),
	AccountLevelController.createAccountLevel
);
router.put(
	"/",
	validateRequest({ body: AccountLevelAttr }),
	AccountLevelController.updateAccountLevel
);

export default router;
