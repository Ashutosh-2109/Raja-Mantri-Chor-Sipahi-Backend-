const { v4: uuidv4 } = require("uuid");
const assignRoles = require("../utils/assignRoles");

const rooms = {}; // In-memory storage

const POINTS = {
  Raja: 1000,
  Mantri: 800,
  Sipahi: 500,
  Chor: 0,
};

// Create Room
exports.createRoom = (req, res) => {
  const roomId = uuidv4();
  const playerId = uuidv4();

  rooms[roomId] = {
    players: [
      { id: playerId, name: req.body.name, role: null, score: 0 },
    ],
    status: "waiting",
    guess: null,
  };

  res.json({ roomId, playerId });
};

// Join Room
exports.joinRoom = (req, res) => {
  const { roomId, name } = req.body;

  if (!rooms[roomId]) {
    return res.status(404).json({ message: "Room not found" });
  }

  if (rooms[roomId].players.length >= 4) {
    return res.status(400).json({ message: "Room full" });
  }

  const playerId = uuidv4();
  rooms[roomId].players.push({
    id: playerId,
    name,
    role: null,
    score: 0,
  });

  res.json({ roomId, playerId });
};

// Assign Roles
exports.assignRolesToRoom = (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  if (!room || room.players.length !== 4) {
    return res.status(400).json({ message: "Need exactly 4 players" });
  }

  assignRoles(room.players);
  room.status = "assigned";

  res.json({ message: "Roles assigned" });
};

// Get My Role
exports.getMyRole = (req, res) => {
  const { roomId, playerId } = req.params;
  const room = rooms[roomId];

  const player = room.players.find(p => p.id === playerId);
  res.json({ role: player.role });
};

// Mantri Guess
exports.makeGuess = (req, res) => {
  const { roomId, guessedPlayerId } = req.body;
  const room = rooms[roomId];

  const mantri = room.players.find(p => p.role === "Mantri");
  if (!mantri) return res.status(400).json({ message: "Mantri not found" });

  room.guess = guessedPlayerId;
  res.json({ message: "Guess submitted" });
};

// Results
exports.getResult = (req, res) => {
  const { roomId } = req.params;
  const room = rooms[roomId];

  const chor = room.players.find(p => p.role === "Chor");
  const mantri = room.players.find(p => p.role === "Mantri");

  if (room.guess === chor.id) {
    room.players.forEach(p => {
      if (p.role !== "Chor") p.score += POINTS[p.role];
    });
  } else {
    chor.score += POINTS["Mantri"];
  }

  res.json({
    players: room.players.map(p => ({
      name: p.name,
      role: p.role,
      score: p.score,
    })),
  });
};
