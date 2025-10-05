import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, XCircle, Clock, ArrowLeft, Code, Terminal } from 'lucide-react';
import { executeJavaScriptLocally, executePythonCode, executeJavaCode } from '../utils/codeExecutor';

const CodingAssessment = ({ module, onBack, onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [language, setLanguage] = useState('javascript');

  const problems = [
    {
      id: 1,
      title: 'Two Sum Problem',
      difficulty: 'Easy',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]' }
      ],
      constraints: [
        '2 ≤ nums.length ≤ 10⁴',
        '-10⁹ ≤ nums[i] ≤ 10⁹',
        'Only one valid answer exists'
      ],
      testCases: [
        { input: '[2,7,11,15], 9', expected: '[0,1]' },
        { input: '[3,2,4], 6', expected: '[1,2]' },
        { input: '[3,3], 6', expected: '[0,1]' }
      ],
      starterCode: {
        javascript: `function twoSum(nums, target) {
    // Write your solution here
    // Example: return [0, 1];
    
}`,
        python: `def two_sum(nums, target):
    # Write your solution here
    # Example: return [0, 1]
    pass`,
        java: `public int[] twoSum(int[] nums, int target) {
    // Write your solution here
    // Example: return new int[]{0, 1};
    
}`
      }
    },
    {
      id: 2,
      title: 'Palindrome Check',
      difficulty: 'Easy',
      description: 'Given a string s, return true if it is a palindrome, or false otherwise. A palindrome is a word that reads the same forward and backward.',
      examples: [
        { input: 's = "racecar"', output: 'true' },
        { input: 's = "hello"', output: 'false' }
      ],
      constraints: [
        '1 ≤ s.length ≤ 2 * 10⁵',
        's consists only of printable ASCII characters'
      ],
      testCases: [
        { input: '"racecar"', expected: 'true' },
        { input: '"hello"', expected: 'false' },
        { input: '"A man a plan a canal Panama"', expected: 'true' }
      ],
      starterCode: {
        javascript: `function isPalindrome(s) {
    // Write your solution here
    // Example: return true or false
    
}`,
        python: `def is_palindrome(s):
    # Write your solution here
    # Example: return True or False
    pass`,
        java: `public boolean isPalindrome(String s) {
    // Write your solution here
    // Example: return true or false
    
}`
      }
    }
  ];

  const currentProb = problems[currentProblem];

  React.useEffect(() => {
    setCode(currentProb.starterCode[language]);
  }, [currentProblem, language, currentProb.starterCode]);

  const handleLanguageChange = (newLang) => {
    if (code !== currentProb.starterCode[language] && code.trim() !== '') {
      if (!window.confirm('Switching languages will reset your code. Continue?')) {
        return;
      }
    }
    setLanguage(newLang);
    setCode(currentProb.starterCode[newLang]);
    setOutput('');
    setTestResults([]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and running code...\n');
    
    try {
      // Real code execution using Judge0 API or similar service
      const results = await executeCode(code, language, currentProb.testCases);
      setTestResults(results);
      
      const passedCount = results.filter(r => r.passed).length;
      setOutput(`Executed ${results.length} test cases\nPassed: ${passedCount}/${results.length}\n\n${
        results.map(r => 
          `Test ${r.id}: ${r.passed ? '✓ PASS' : '✗ FAIL'}\nInput: ${r.input}\nExpected: ${r.expected}\nActual: ${r.actual}\n${r.error ? `Error: ${r.error}` : ''}`
        ).join('\n\n')
      }`);
    } catch (error) {
      setOutput(`Compilation Error:\n${error.message}`);
      setTestResults([]);
    }
    
    setIsRunning(false);
  };

  const executeCode = async (sourceCode, lang, testCases) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results;
        
        switch (lang) {
          case 'javascript':
            results = executeJavaScriptLocally(sourceCode, testCases);
            break;
          case 'python':
            results = executePythonCode(sourceCode, testCases);
            break;
          case 'java':
            results = executeJavaCode(sourceCode, testCases);
            break;
          default:
            results = testCases.map((testCase, index) => ({
              id: index + 1,
              input: testCase.input,
              expected: testCase.expected,
              actual: 'Language not supported',
              passed: false,
              error: 'Unsupported language'
            }));
        }
        
        resolve(results);
      }, 1500);
    });
  };

  const submitSolution = () => {
    const passedTests = testResults.filter(r => r.passed).length;
    const totalTests = testResults.length;
    
    if (passedTests === totalTests) {
      if (currentProblem < problems.length - 1) {
        setCurrentProblem(currentProblem + 1);
        setCode(problems[currentProblem + 1].starterCode[language]);
        setOutput('');
        setTestResults([]);
      } else {
        onComplete(true);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-600 bg-green-100',
      'Medium': 'text-yellow-600 bg-yellow-100',
      'Hard': 'text-red-600 bg-red-100'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Coding Assessment</h1>
              <p className="text-gray-600">{module.name} - Problem {currentProblem + 1} of {problems.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">45:00</span>
            </div>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{currentProb.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentProb.difficulty)}`}>
                {currentProb.difficulty}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">{currentProb.description}</p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Examples:</h3>
              {currentProb.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="mb-2">
                    <strong>Input:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{example.input}</code>
                  </div>
                  <div>
                    <strong>Output:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{example.output}</code>
                  </div>
                </div>
              ))}

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Constraints:</h3>
              <ul className="list-disc list-inside space-y-1 mb-6">
                {currentProb.constraints.map((constraint, index) => (
                  <li key={index} className="text-gray-700">{constraint}</li>
                ))}
              </ul>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Results:</h3>
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div key={result.id} className={`p-3 rounded-lg border ${
                      result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Test Case {result.id}</span>
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Code Editor</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg text-sm font-medium flex items-center"
                >
                  {isRunning ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <button
                  onClick={submitSolution}
                  disabled={testResults.length === 0 || testResults.some(r => !r.passed)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium"
                >
                  Submit
                </button>
              </div>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none focus:outline-none"
              placeholder="Write your code here..."
              spellCheck={false}
            />
          </div>

          {/* Output Panel */}
          <div className="h-1/3 border-t border-gray-200">
            <div className="bg-gray-100 px-4 py-2 flex items-center">
              <Terminal className="w-4 h-4 mr-2 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Output</span>
            </div>
            <div className="h-full p-4 bg-black text-green-400 font-mono text-sm overflow-y-auto">
              <pre className="whitespace-pre-wrap">{output || 'Click "Run Code" to see output...'}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessment;