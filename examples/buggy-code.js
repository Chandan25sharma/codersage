// Example 1: Array Index Out of Bounds Error
function calculateSum(arr) {
  let sum = 0;
  // Bug: i <= arr.length will cause undefined access
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Example 2: Inefficient nested loops
function findDuplicates(arr1, arr2) {
  let duplicates = [];
  // Bug: O(n²) complexity, should use Set
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] == arr2[j]) {  // Bug: using == instead of ===
        duplicates.push(arr1[i]);
      }
    }
  }
  return duplicates;
}

// Example 3: Memory leak with event listeners
class Component {
  constructor() {
    this.data = new Array(1000000);
    window.addEventListener('resize', this.handleResize);
    // Bug: Not removing event listener
  }
  
  handleResize() {
    console.log('Resizing...');
  }
}

// Example 4: SQL Injection vulnerability
function getUserData(username) {
  // Bug: SQL injection vulnerability
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  return database.execute(query);
}

// Example 5: Race condition
let counter = 0;
function incrementCounter() {
  // Bug: Race condition in async context
  const temp = counter;
  setTimeout(() => {
    counter = temp + 1;
  }, 10);
}

// Paste any of these examples into CodeSage to see AI analysis!
