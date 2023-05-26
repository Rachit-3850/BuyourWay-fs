const express = require("express");
const router = express.Router();

const {
	registerUser,
	loginUser,
	logoutUser,
	forgetPassword,
	resetPassword,
	getUserProfile,
    updatePassword,
    updateProfile , 
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require("../controllers/authController");

const {isAuthenticatedUser , authorizeRoles} = require('../middlewares/auth')

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgetPassword").post(forgetPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/me").get(isAuthenticatedUser , getUserProfile);
router.route("/updatePassword").post(isAuthenticatedUser ,updatePassword );
router.route("/updateProfile").post(isAuthenticatedUser ,updateProfile );
router.route("/admin/users").get(isAuthenticatedUser ,authorizeRoles("admin") , allUsers );
router.route("/admin/user/:id").get(isAuthenticatedUser ,authorizeRoles("admin") , getUserDetails );
router.route("/admin/user/update/:id").post(isAuthenticatedUser ,authorizeRoles("admin") , updateUser);
router.route("/admin/user/delete/:id").delete(isAuthenticatedUser ,authorizeRoles("admin") , deleteUser);


module.exports = router;
