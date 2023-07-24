const BoardM = require("./BoardM");
const BoardLableM = require("./BoardLableM");
const BoardListM = require("./BoardListM");
const CardAttachmentM = require("./CardAttachmentM");
const CardCheckListItemsM = require("./CardCheckListItemsM");
const CardM = require("./CardM");
const CardLableM = require("./CardLableM");
const CardMembersM = require("./CardMembersM");
const CommentM = require("./CommentM");
const ProjectM = require("./ProjectM");
const ProjectTeamM = require("./ProjectTeamM");
const TaskM = require("./TaskM");
const UserM = require("./UserM");

// BOARD HAS ONE OWNER
BoardM.hasOne(UserM, { foreignKey: "owner_id" });


CardLableM.belongsTo(BoardM, { foreignKey: "board_id" });
CardLableM.belongsTo(CardM, { foreignKey: "card_id" });

CommentM.belongsTo(TaskM, { foreignKey: "task_id" });
CommentM.belongsTo(UserM, { foreignKey: "user_id" });

ProjectM.hasMany(TaskM, { foreignKey: "project_id" });
ProjectM.belongsToMany(UserM, { through: ProjectTeamM, foreignKey: "project_id" });

TaskM.belongsTo(ProjectM, { foreignKey: "project_id" });
TaskM.hasMany(CommentM, { foreignKey: "task_id" });

UserM.belongsToMany(ProjectM, { through: ProjectTeamM, foreignKey: "user_id" });
UserM.hasMany(CommentM, { foreignKey: "user_id" });

module.exports = {
  BoardM,
  BoardLableM,
  BoardListM,
  CardAttachmentM,
  CardCheckListItemsM,
  CardM,
  CardLableM,
  CardMembersM,
  CommentM,
  ProjectM,
  ProjectTeamM,
  TaskM,
  UserM,
};
