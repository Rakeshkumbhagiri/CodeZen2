// Mock API services (clean + simplified)

import { PROBLEMS, SUBMISSIONS, AI_HINT_RESPONSES } from '../utils/mockData';
import { generateId } from '../utils/formatters';

// Simulate delay
const delay = (ms = 800) => new Promise(res => setTimeout(res, ms));

// /* ================= AUTH ================= */
// export const authService = {
// async login(email, password) {
// await delay(1000);


// if (!email || password.length < 6) {
//   throw new Error('Invalid credentials');
// }

// return {
//   user: {
//     id: 'u1',
//     name: email.split('@')[0],
//     email,
//     stats: {
//       solved: 42,
//       accuracy: 78,
//       streak: 7,
//       rank: 1204
//     }
//   },
//   token: 'mock_' + generateId()
// };


// },

// async signup(name, email, password) {
// await delay(1000);

// ```
// if (!name || !email || password.length < 6) {
//   throw new Error('Signup failed');
// }

// return {
//   user: {
//     id: 'u' + generateId(),
//     name,
//     email,
//     stats: {
//       solved: 0,
//       accuracy: 0,
//       streak: 0,
//       rank: 9999
//     }
//   },
//   token: 'mock_' + generateId()
// };
// ```

// }
// };

/* ================= PROBLEMS ================= */
export const problemService = {
async getAll() {
await delay();
return PROBLEMS || [];
},

async getById(id) {
await delay();
const problem = PROBLEMS.find(p => p.id === Number(id));

```
if (!problem) throw new Error('Problem not found');

return problem;
```

}
};

/* ================= SUBMISSIONS ================= */
export const submissionService = {
async run(problemId, code, language) {
await delay(1500);


const passed = Math.random() > 0.3;

return {
  status: passed ? 'Passed' : 'Failed',
  runtime: `${Math.floor(Math.random() * 200)} ms`,
  memory: `${(Math.random() * 10 + 10).toFixed(1)} MB`,
  stdout: passed
    ? 'All test cases passed!'
    : 'Wrong answer on test case',
  testCases: [
    { name: 'Case 1', passed },
    { name: 'Case 2', passed },
    { name: 'Edge Case', passed: Math.random() > 0.5 }
  ]
};


},

async submit(problemId, code, language) {
await delay(2000);


const score = Math.random();

return {
  id: 's' + generateId(),
  status: score > 0.7 ? 'Correct' : 'Incorrect',
  score: Math.floor(score * 100),
  runtime: `${Math.floor(Math.random() * 100)} ms`
};


},

async getHistory() {
await delay();
return SUBMISSIONS || [];
}
};

/* ================= FEEDBACK ================= */
export const feedbackService = {
async analyze(code, problemId) {
await delay(1200);


return {
  syntaxErrors: code.includes('error')
    ? [{ line: 1, message: 'Syntax Error' }]
    : [],

  hints: [
    'Check base case',
    'Try using a hash map',
    'Think about sliding window'
  ],

  edgeCases: [
    'Empty input',
    'Single element',
    'Duplicate values'
  ],

  complexity: {
    time: 'O(n²)',
    space: 'O(n)',
    suggestion: 'Try optimizing to O(n)'
  }
};


}
};

/* ================= CHAT ================= */
export const chatService = {
async sendMessage(message, problem) {
await delay(1000);


const lower = message.toLowerCase();

let match = AI_HINT_RESPONSES.find(r =>
  lower.includes(r.trigger)
);

if (match) {
  return { role: 'assistant', content: match.response };
}

return {
  role: 'assistant',
  content: `Think about ${
    problem?.topics?.join(', ') || 'the problem'
  }. Can you optimize your approach?`
};


}
};
