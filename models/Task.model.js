const { Schema, model } = require("mongoose")

const TaskSchema = new Schema(
    {
        title: String,
        description: String,
        project: { type: Schema.Types.ObjectId, ref: 'Project' }
    },
    {
        timestamps: true
    }
)

module.exports = model("Task", TaskSchema)