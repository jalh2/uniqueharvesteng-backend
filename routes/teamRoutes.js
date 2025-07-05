const express = require('express');
const router = express.Router();
const {
  getTeam,
  updateTeamInfo,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamController');

// GET team information
router.get('/', getTeam);

// PUT (update) team information (Key Technical Personnel and Methodology)
router.put('/', updateTeamInfo);

// POST a new team member
router.post('/members', addTeamMember);

// PUT (update) a team member by ID
router.put('/members/:memberId', updateTeamMember);

// DELETE a team member by ID
router.delete('/members/:memberId', deleteTeamMember);

module.exports = router;
