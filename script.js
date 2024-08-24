const start = document.querySelector("#start");
const boxes = document.querySelectorAll(".box");
const Winne = document.querySelector("#winner");
const popup = document.querySelector(".popupContainer");
const playe = document.querySelector("#player");

let winner = false;
let count = 0;

const winningCombos = [
   [0, 1, 2],
   [3, 4, 5], // horizontal combinations
   [6, 7, 8],

   [0, 3, 6],
   [1, 4, 7], // vertical combinations
   [2, 5, 8],

   [0, 4, 8], // diagonal combinations
   [2, 4, 6]
]

   // Function to start the game, setting some important, "to be used later values" to what they need to be

const StartGame = () => {

   start.classList.add("active");
   playe.classList.add("active");
   popup.classList.remove("active");

   count = 0;
   
   let turnX = true;
   
   boxes.forEach(box => {
      box.removeAttribute('disabled');
      box.innerHTML = ""

      box.addEventListener('click', () => {

         // On Clicking, checks if the turn is of X or not. If Yes, sets the content of the box 
         // to O and vise-versa

         if (turnX) {
            box.innerHTML = "X";
            turnX = false;
         } else {
            box.innerHTML = "O"
            turnX = true;
         };
         
         box.setAttribute('disabled', true);

         // The checkWinner function checks if the boxes with the appropriate turn (X or O) 
         // matches the ones in the combos list. if yes, then shows the winner in a popup.

         // We utilize the nodelist to do so as it behavevs simmilarly to a normal array

         // we first iterate through the combos array taking each array element as a "combo".
         // we then select the first, second and third element of the "combo array"
         // (refer to winningCombos array to get a better understanding of what i mean)

         // Fuck i cant explain my own code further... what will my future be if it stays
         // like this???

         const checkWinner = () => {
            for (let combo of winningCombos) {
               let pos1Val = boxes[combo[0]].innerHTML;
               let pos2Val = boxes[combo[1]].innerHTML;
               let pos3Val = boxes[combo[2]].innerHTML;
         
               if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {   
                  if (pos1Val === pos2Val && pos2Val === pos3Val) {
                     popup.classList.add("active");
                     Winne.textContent = `${pos1Val} Wins!`;
                     return true
                  };
               };
            };
         };

         // this section of code checks if there is a tie or not.
         // we set a "count" varible that increases on every click event.
         // we set the winner varible to be the return value of check winner (if there is one).
         // in this case, there will be no winner so we then just put "Its a Tie" on the popup


         winner = checkWinner();

         if (count === 9 && !winner) {
            popup.classList.add("active");
            Winne.textContent = `Its a Tie!`;
            count = 0;
         };

      });
   });
};

 // This function COMPLETELY resets the game, resetting all the "to be used later" values.

function exit() {
   popup.classList.remove("active");
   start.classList.remove("active");
   playe.classList.remove("active");
   count = 0;
   winner = false
   
   boxes.forEach(box => {
      box.innerHTML = "";
      box.setAttribute("disabled", true);
   });
};

