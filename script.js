// get all needed DOM elements
const form = document.getElementById("checkInForm");
var nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const greeting = document.getElementById("greeting");
const celebrationMessage = document.getElementById("celebrationMessage");
const attendeeList = document.getElementById("attendeeList");

// track attendance
let count = 0;
let maxCount = 50;

// handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // get form values
  const name = nameInput.value.trim();
  const team = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;

  console.log(name, team, teamName);

  //increment count
  count++;
  console.log("Total check-ins: " + count);

  // update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log("Progress: " + percentage);
  // increase progress bar width and update text
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;
  progressBar.textContent = percentage;

  // update team counter
  const teamCounter = document.getElementById(team + "Count");
  const current = parseInt(teamCounter.textContent);
  console.log("Previous team count: ", current);
  const newTotal = current + 1;
  console.log("New team count: ", newTotal);
  // update team count display
  teamCounter.textContent = newTotal;
  // display new attendee count
  attendeeCount.textContent = count;

  // add attendee to list
  const listItem = document.createElement("li");
  listItem.className = "attendee-item";
  const nameColumn = document.createElement("div");
  nameColumn.className = "attendee-name";
  nameColumn.textContent = name;
  const teamColumn = document.createElement("div");
  teamColumn.className = "attendee-team";
  teamColumn.textContent = teamName;
  listItem.appendChild(nameColumn);
  listItem.appendChild(teamColumn);
  attendeeList.prepend(listItem);

  // show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  console.log(message);

  // display welcome greeting
  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.className = "success-message";

  // celebration message
  if (count === maxCount) {
    // get team with highest attendance
    const { leadingTeam, maxCount } = getLeadingTeam();
    console.log("Leading team: ", leadingTeam, " with count: ", maxCount);
    // display celebration message
    celebrationMessage.textContent = `🎉 Congratulations to ${leadingTeam} for leading with ${maxCount} attendees! 🎉`;
    celebrationMessage.style.display = "block";
  }

  // reset form
  form.reset();
});

function getLeadingTeam() {
  const water = parseInt(document.getElementById("waterCount").textContent);
  const zero = parseInt(document.getElementById("zeroCount").textContent);
  const power = parseInt(document.getElementById("powerCount").textContent);
  let leadingTeam = "Water";
  let maxCount = water;
  if (zero > maxCount) {
    leadingTeam = "Zero";
    maxCount = zero;
  }
  if (power > maxCount) {
    leadingTeam = "Power";
    maxCount = power;
  }
  return { leadingTeam, maxCount };
}
