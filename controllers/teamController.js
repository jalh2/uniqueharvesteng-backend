const Team = require('../models/Team');

// Get Team information (Key Technical Personnel, Methodology, and Team Members)
// If no document exists, it creates a default one.
exports.getTeam = async (req, res) => {
  try {
    let team = await Team.findOne();
    if (!team) {
      team = new Team({
        keyTechnicalPersonnel: [],
        methodology: [],
        teamMembers: []
      });
      await team.save();
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Team information (Key Technical Personnel and Methodology)
exports.updateTeamInfo = async (req, res) => {
    const { keyTechnicalPersonnel, methodology } = req.body;
    try {
        let team = await Team.findOne();
        if (!team) {
            team = new Team({ keyTechnicalPersonnel, methodology, teamMembers: [] });
        } else {
            if(keyTechnicalPersonnel !== undefined) team.keyTechnicalPersonnel = keyTechnicalPersonnel;
            if(methodology !== undefined) team.methodology = methodology;
        }
        const updatedTeam = await team.save();
        res.status(200).json(updatedTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a new Team Member
exports.addTeamMember = async (req, res) => {
  const { name, position, image } = req.body;
  try {
    let team = await Team.findOne();
    if (!team) {
      team = new Team({ keyTechnicalPersonnel: [], methodology: [], teamMembers: [] });
    }
    team.teamMembers.push({ name, position, image });
    await team.save();
    // Return the newly added member, which is the last one in the array
    const newMember = team.teamMembers[team.teamMembers.length - 1];
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a Team Member
exports.updateTeamMember = async (req, res) => {
  const { memberId } = req.params;
  const { name, position, image } = req.body;
  try {
    const team = await Team.findOne();
    if (!team) {
      return res.status(404).json({ message: 'Team information not found' });
    }
    const member = team.teamMembers.id(memberId);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    member.name = name || member.name;
    member.position = position || member.position;
    member.image = image || member.image;
    await team.save();
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Team Member
exports.deleteTeamMember = async (req, res) => {
  const { memberId } = req.params;
  try {
    const team = await Team.findOne();
    if (!team) {
      return res.status(404).json({ message: 'Team information not found' });
    }
    const member = team.teamMembers.id(memberId);
    if (!member) {
        return res.status(404).json({ message: 'Team member not found' });
    }
    member.remove();
    await team.save();
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
