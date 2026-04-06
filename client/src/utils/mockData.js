export const ACCURACY_DATA = [
  { week: "W1", accuracy: 45, problems: 3 },
  { week: "W2", accuracy: 52, problems: 5 },
];

export const TOPIC_RADAR_DATA = [
  { topic: "Arrays", score: 82 },
  { topic: "Trees", score: 65 },
];

export const ERROR_PATTERN_DATA = [
  { name: "Index OOB", count: 12 },
  { name: "TLE", count: 8 },
];

export const SUBMISSIONS = [
  {
    id: "s1",
    problemId: 1,
    problemTitle: "Two Sum",
    language: "Python",
    status: "Correct",
    runtime: "52 ms",
    memory: "14.8 MB",
    submittedAt: "2024-01-15T10:30:00Z",
    code: `def twoSum(nums, target):
    pass`,
    feedback: "Good solution",
  },
];

export const AI_HINT_RESPONSES = [
  {
    trigger: "stuck",
    response:
      "Think about brute force first before optimizing.",
  },
];

export const TOPICS = [
  "All",
  "Arrays",
  "String",
  "Trees",
];

export const DIFFICULTIES = [
  "All",
  "Easy",
  "Medium",
  "Hard",
];

export const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Medium",
    topic: "Linked List",
  },
];