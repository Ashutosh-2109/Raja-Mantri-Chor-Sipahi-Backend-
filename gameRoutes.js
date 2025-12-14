const express = require("express");
const router = express.Router();
const controller = require("../controllers/gameController");

router.post("/room/create", controller.createRoom);
router.post("/room/join", controller.joinRoom);
router.post("/room/assign/:roomId", controller.assignRolesToRoom);
router.get("/role/me/:roomId/:playerId", controller.getMyRole);
router.post("/guess", controller.makeGuess);
router.get("/result/:roomId", controller.getResult);

module.exports = router;
