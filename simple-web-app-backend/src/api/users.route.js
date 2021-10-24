import { Router } from "express"
import usersCtrl from "./index"

const router = new Router()

// associate put, delete, and get(id)
router.route("/register").post(usersCtrl.postUser)
router.route("/").get(usersCtrl.getUsers)
router.route("/").put(usersCtrl.patchUser)
router.route("/").delete(usersCtrl.deleteUser)
router.route("/login").post(usersCtrl.signInUser)
router.route("/logout").delete(usersCtrl.signOutUser)
router.route("/delete").delete(usersCtrl.deleteUser)
router.route("/update-preferences").put(usersCtrl.deleteUser)

export default router