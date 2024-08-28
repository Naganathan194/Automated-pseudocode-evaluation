// const questions = [
//     { id: 1, text: 'Write a pseudo code to print "Hello World"' },
//     { id: 2, text: 'Write a pseudo code to find the sum of two numbers' },
//     { id: 3, text: 'Write a pseudo code to check if a number is prime' },
//     { id: 4, text: 'Write a pseudo code to check if a number is odd' },

//   ];
  
//   let currentQuestion = 0;
//   const pseudoCodeInput = document.getElementById('pseudoCodeInput');
//   const questionNumber = document.getElementById('questionNumber');
//   const questionText = document.getElementById('questionText');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');
//   const saveBtn = document.getElementById('saveBtn');
  
//   const answers = {};
  
//   function updateQuestion() {
//     questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
//     questionText.textContent = questions[currentQuestion].text;
//     pseudoCodeInput.value = answers[currentQuestion] || '';
//     prevBtn.disabled = currentQuestion === 0;
//     nextBtn.disabled = currentQuestion >= questions.length - 1;
//   }
  
//   function handleNextQuestion() {
//     if (currentQuestion < questions.length - 1) {
//       saveAnswer();
//       currentQuestion += 1;
//       updateQuestion();
//     }
//   }
  
//   function handlePreviousQuestion() {
//     if (currentQuestion > 0) {
//       saveAnswer();
//       currentQuestion -= 1;
//       updateQuestion();
//     }
//   }
  
//   function handleSaveAnswer() {
//     saveAnswer();
//   }
  
//   function saveAnswer() {
//     answers[currentQuestion] = pseudoCodeInput.value;
//   }
  
//   document.addEventListener('DOMContentLoaded', () => {
//     updateQuestion();
//   });
  
// const questions = [
//   { id: 1, text: 'Write a pseudo code to print "Hello World"' },
//   { id: 2, text: 'Write a pseudo code to find the sum of two numbers' },
//   { id: 3, text: 'Write a pseudo code to check if a number is prime' },
//   { id: 4, text: 'Write a pseudo code to check if a number is odd' },
// ];

// let currentQuestion = 0;
// const pseudoCodeInput = document.getElementById('pseudoCodeInput');
// const questionNumber = document.getElementById('questionNumber');
// const questionText = document.getElementById('questionText');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');
// const saveBtn = document.getElementById('saveBtn');

// const answers = {};
// let userDetails = {};

// function updateQuestion() {
//   questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
//   questionText.textContent = questions[currentQuestion].text;
//   pseudoCodeInput.value = answers[currentQuestion] || '';
//   prevBtn.disabled = currentQuestion === 0;
//   nextBtn.disabled = currentQuestion >= questions.length - 1;
// }

// function handleNextQuestion() {
//   if (currentQuestion < questions.length - 1) {
//       saveAnswer();
//       currentQuestion += 1;
//       updateQuestion();
//   }
// }

// function handlePreviousQuestion() {
//   if (currentQuestion > 0) {
//       saveAnswer();
//       currentQuestion -= 1;
//       updateQuestion();
//   }
// }

// function handleSaveAnswer() {
//   saveAnswer();
// }

// function saveAnswer() {
//   answers[currentQuestion] = pseudoCodeInput.value;
// }

// function saveAllAnswers() {
//   const register_no = localStorage.getItem('register_no');
//   if (register_no) {
//       userDetails.pseudoCodeAnswers = answers;
//       $.ajax({
//           url: `http://localhost:8000/submit-answers/${register_no}`,
//           type: 'PUT',
//           contentType: 'application/json',
//           data: JSON.stringify(userDetails),
//           success: function(response) {
//               alert("Answers saved successfully!");
//               console.log(response);
//           },
//           error: function(xhr, status, error) {
//               alert("Error saving answers!");
//               console.error("Status:", status);
//               console.error("Error:", error);
//               console.error("Response:", xhr.responseText);
//           }
//       });
//   } else {
//       alert("Register number not found in local storage.");
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const register_no = localStorage.getItem('register_no');
//   if (register_no) {
//       $.ajax({
//           url: `http://localhost:8000/get-user-details/${register_no}`,
//           type: 'GET',
//           success: function(response) {
//               userDetails = response;
//               if (userDetails.pseudoCodeAnswers) {
//                   Object.assign(answers, userDetails.pseudoCodeAnswers);
//               }
//               updateQuestion();
//           },
//           error: function(xhr, status, error) {
//               alert("Error fetching user details!");
//               console.error("Status:", status);
//               console.error("Error:", error);
//               console.error("Response:", xhr.responseText);
//           }
//       });
//   } else {
//       alert("Register number not found in local storage.");
//   }
// });

const questions = [
  { id: 1, text: 'Write a pseudo code to print "Hello World"' },
  { id: 2, text: 'Write a pseudo code to find the sum of two numbers' },
  { id: 3, text: 'Write a pseudo code to check if a number is prime' },
  { id: 4, text: 'Write a pseudo code to check if a number is odd' },
];

let currentQuestion = 0;
const pseudoCodeInput = document.getElementById('pseudoCodeInput');
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const saveBtn = document.getElementById('saveBtn');
const submitBtn = document.getElementById('submitBtn'); // New Submit Button

const answers = {};
let userDetails = {};

function updateQuestion() {
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = questions[currentQuestion].text;
  pseudoCodeInput.value = answers[currentQuestion] || '';
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion >= questions.length - 1;
  submitBtn.style.display = currentQuestion === questions.length - 1 ? 'block' : 'none'; // Show submit button on the last question
}

function handleNextQuestion() {
  if (currentQuestion < questions.length - 1) {
      saveAnswer();
      currentQuestion += 1;
      updateQuestion();
  }
}

function handlePreviousQuestion() {
  if (currentQuestion > 0) {
      saveAnswer();
      currentQuestion -= 1;
      updateQuestion();
  }
}

function handleSaveAnswer() {
  saveAnswer();
}

function saveAnswer() {
  answers[currentQuestion] = pseudoCodeInput.value;
}

function handleSubmit() {
  saveAnswer();  // Ensure the current answer is saved
  
  const register_no = localStorage.getItem('register_no');
  
  if (register_no) {
      $.ajax({
          url: `https://172.16.172.168:8000/${register_no}`,
          type: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ pseudoCodeAnswers: answers }),  // Wrap in an object to match the Python endpoint
          success: function(response) {
              alert("Answers submitted successfully!");
              console.log(response);
              submitBtn.disabled = true;  // Disable submit button after successful submission
          },
          error: function(xhr, status, error) {
              alert("Error submitting answers!");
              console.error("Status:", status);
              console.error("Error:", error);
              console.error("Response:", xhr.responseText);
          }
      });
  } else {
      alert("Register number not found in local storage.");
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const register_no = localStorage.getItem('register_no');
  if (register_no) {
      $.ajax({
          url: `http://172.16.172.168:8000/get-user-details/${register_no}`,
          type: 'GET',
          success: function(response) {
              userDetails = response;
              if (userDetails.pseudoCodeAnswers) {
                  Object.assign(answers, userDetails.pseudoCodeAnswers);
              }
              updateQuestion();
          },
          error: function(xhr, status, error) {
              alert("Error fetching user details!");
              console.error("Status:", status);
              console.error("Error:", error);
              console.error("Response:", xhr.responseText);
          }
      });
  } else {
      alert("Register number not found in local storage.");
  }
});
