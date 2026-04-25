import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Error"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student"
    },

    solvedProblems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
      }
    ],

    submissions: [submissionSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Person", userSchema);