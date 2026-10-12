import mongoose from 'mongoose'
import { connectionString } from '../config/database.js'
import Activity from '../models/Activity.js'
import Leaderboard from '../models/Leaderboard.js'
import Team from '../models/Team.js'
import User from '../models/User.js'
import Workout from '../models/Workout.js'

const sampleUsers = [
  {
    name: 'Mona the Octocat',
    username: 'mona-octocat',
    email: 'mona@example.com',
    age: 28,
    fitnessGoal: 'Build a consistent running habit',
  },
  {
    name: 'The Octogirl',
    username: 'octogirl',
    email: 'octogirl@example.com',
    age: 31,
    fitnessGoal: 'Improve strength and endurance',
  },
  {
    name: 'The Octodog',
    username: 'octodog',
    email: 'octodog@example.com',
    age: 26,
    fitnessGoal: 'Stay active with the team',
  },
]

const sampleWorkouts = [
  {
    title: 'Easy Start Run',
    description: 'A comfortable run with a gentle warm-up and cool-down.',
    difficulty: 'beginner',
    durationMinutes: 25,
    focus: 'cardio',
  },
  {
    title: 'Bodyweight Strength',
    description: 'A balanced circuit of squats, push-ups, lunges, and planks.',
    difficulty: 'intermediate',
    durationMinutes: 30,
    focus: 'strength',
  },
  {
    title: 'Recovery Flow',
    description: 'A mobility-focused yoga session to support recovery.',
    difficulty: 'beginner',
    durationMinutes: 20,
    focus: 'mobility',
  },
] as const

/**
 * Seed the octofit_db database with test data.
 * Existing matching records are kept so rerunning this script is safe.
 */
async function seedDatabase() {
  await mongoose.connect(connectionString)

  try {
    console.log('Connected to octofit_db')

    const existingUsers = await User.find({
      $or: sampleUsers.map(({ username, email }) => ({ $or: [{ username }, { email }] })),
    })
    const existingUserNames = new Set(existingUsers.map(({ username }) => username))
    const missingUsers = sampleUsers.filter(({ username }) => !existingUserNames.has(username))
    if (missingUsers.length) {
      await User.insertMany(missingUsers)
    }
    const users = await User.find({ username: { $in: sampleUsers.map(({ username }) => username) } })

    let team = await Team.findOne({ name: 'Octocats United' })
    if (!team) {
      ;[team] = await Team.insertMany([
        {
          name: 'Octocats United',
          description: 'A friendly team building healthy habits together.',
          members: users.map(({ _id }) => _id),
          captain: users[0]?._id,
        },
      ])
    } else {
      await Team.updateOne(
        { _id: team._id },
        { $addToSet: { members: { $each: users.map(({ _id }) => _id) } } },
      )
    }

    await User.updateMany({ _id: { $in: users.map(({ _id }) => _id) } }, { $set: { team: team._id } })

    const activitySamples = [
      {
        user: users[0]!._id,
        team: team._id,
        type: 'run',
        durationMinutes: 32,
        distanceKm: 5.2,
        calories: 340,
        completedAt: new Date('2026-10-10T08:00:00.000Z'),
      },
      {
        user: users[1]!._id,
        team: team._id,
        type: 'ride',
        durationMinutes: 45,
        distanceKm: 14.8,
        calories: 410,
        completedAt: new Date('2026-10-11T09:00:00.000Z'),
      },
      {
        user: users[2]!._id,
        team: team._id,
        type: 'strength',
        durationMinutes: 35,
        calories: 250,
        completedAt: new Date('2026-10-11T16:30:00.000Z'),
      },
    ]
    const existingActivities = await Activity.find({
      user: { $in: activitySamples.map(({ user }) => user) },
      completedAt: { $in: activitySamples.map(({ completedAt }) => completedAt) },
    })
    const existingActivityKeys = new Set(
      existingActivities.map(({ user, completedAt }) => `${user}:${completedAt.toISOString()}`),
    )
    const missingActivities = activitySamples.filter(
      ({ user, completedAt }) => !existingActivityKeys.has(`${user}:${completedAt.toISOString()}`),
    )
    if (missingActivities.length) {
      await Activity.insertMany(missingActivities)
    }

    const leaderboardSamples = users.map((user, index) => ({
      user: user._id,
      team: team._id,
      period: 'weekly' as const,
      points: [120, 95, 70][index]!,
      rank: index + 1,
    }))
    const existingLeaderboard = await Leaderboard.find({
      user: { $in: leaderboardSamples.map(({ user }) => user) },
      period: 'weekly',
    })
    const rankedUsers = new Set(existingLeaderboard.map(({ user }) => user.toString()))
    const missingLeaderboard = leaderboardSamples.filter(({ user }) => !rankedUsers.has(user.toString()))
    if (missingLeaderboard.length) {
      await Leaderboard.insertMany(missingLeaderboard)
    }

    const existingWorkouts = await Workout.find({
      title: { $in: sampleWorkouts.map(({ title }) => title) },
    })
    const existingWorkoutTitles = new Set(existingWorkouts.map(({ title }) => title))
    const missingWorkouts = sampleWorkouts.filter(({ title }) => !existingWorkoutTitles.has(title))
    if (missingWorkouts.length) {
      await Workout.insertMany(missingWorkouts)
    }

    console.log('Database seeding complete')
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error)
  process.exitCode = 1
})
