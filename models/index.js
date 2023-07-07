const CommentM = require("./CommentM");
const ProjectM = require("./ProjectM");
const ProjectTeamM = require("./ProjectTeamM");
const TaskM = require("./TaskM");
const UserM = require("./UserM");

CommentM.belongsTo(TaskM, { foreignKey: "task_id" });
CommentM.belongsTo(UserM, { foreignKey: "user_id" });

ProjectM.hasMany(TaskM, { foreignKey: "project_id" });
ProjectM.belongsToMany(UserM, { through: ProjectTeamM, foreignKey: "project_id" });

TaskM.belongsTo(ProjectM, { foreignKey: "project_id" });
TaskM.hasMany(CommentM, { foreignKey: "task_id" });

UserM.belongsToMany(ProjectM, { through: ProjectTeamM, foreignKey: "user_id" });
UserM.hasMany(CommentM, { foreignKey: "user_id" });

module.exports = {
    CommentM,
    ProjectM,
    ProjectTeamM,
    TaskM,
    UserM,
}