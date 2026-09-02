const express = require("express");
const router = express.Router();
const {handleGetAllUser , handleGetUserById , handleUpdateUserById , handleDeleteUserById , handleCreateNewUser} = require("../controllers/user");


router.route("/")
.get(handleGetAllUser)
.post(handleCreateNewUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)



module.exports = router;