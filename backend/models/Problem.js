import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: {
    type: String,
    required: true
  },
  expected: {
    type: String,
    required: true
  }
});

const boilerplateSchema = new mongoose.Schema({
  java: {
    type: String,
    required: true
  },
  python: {
    type: String,
    required: true
  }
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },

    topics: {
      type: [String],
      required: true,
      index: true
    },

    boilerplate: {
      type: boilerplateSchema,
      required: true
    },

    testCases: {
  type: [testCaseSchema],
  required: true,
  validate: {
    validator: function (arr) {
      return arr.every(tc =>
        typeof tc.input === "string" &&
        typeof tc.expected === "string"
      );
    },
    message: "Invalid test case format"
  }
}
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Problem", problemSchema);



// {
//   "title": "Sum of Two Numbers",
//   "description": "Given two integers, return their sum.",
//   "difficulty": "easy",
//   "boilerplate": {
//     "java": "public class Main { public static void main(String[] args) { } }",
//     "python": "def main():\n    pass\n\nif __name__ == '__main__':\n    main()"
//   },
//   "testCases": [
//     { "input": "2 3", "expected": "5" },
//     { "input": "10 20", "expected": "30" }
//   ]
// }