import { model, Schema } from 'mongoose'

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    focus: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export default model('Workout', workoutSchema)
