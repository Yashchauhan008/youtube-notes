
const notesMain = document.createElement("div");
notesMain.id = "notesMain";

const newBtn = document.createElement("button");
newBtn.textContent = "Yash Magic Under Progress";
newBtn.id = "noteBtn"; // Assign ID so styles from CSS apply

notesMain.appendChild(newBtn);

// Create Popup Element (Initially Hidden)
const popup = document.createElement("div");
popup.id = "notePopup";
popup.style.display = "none"; // Initially hidden
popup.innerHTML = `
    <div id="popupContent">
        <h3>My Notes</h3>
        <textarea id="noteInput" placeholder="Write your note here..."></textarea>
        <button id="saveNote">Save</button>
        <ul id="noteList"></ul>
    </div>
`;

notesMain.appendChild(popup);

// Function to insert the button at the beginning
function addButton() {
    const secondary = document.getElementById("secondary-inner");
    if (secondary && !document.getElementById("notesMain")) {
        if (secondary.firstChild) {
            secondary.insertBefore(notesMain, secondary.firstChild);
        } else {
            secondary.appendChild(notesMain);
        }
        console.log("Note Button Added at the Beginning!");
    } else {
        console.log("Waiting for YouTube to load...");
        setTimeout(addButton, 1000);
    }
}

addButton();

// Function to toggle popup visibility
function togglePopup() {
    if (popup.style.display === "none") {
        popup.style.display = "block";
        notesMain.style.height = "300px"; // Increase height when popup is visible
        loadNotes();
    } else {
        popup.style.display = "none";
        notesMain.style.height = "70px"; // Reset height when popup is hidden
    }
}

// Event Listener to toggle popup
newBtn.addEventListener("click", togglePopup);

// Function to save note to localStorage
function saveNote() {
    const noteInput = document.getElementById("noteInput").value.trim();
    if (noteInput === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteInput);
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";
    loadNotes();
}

// Function to load notes from localStorage
function loadNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteNote(index);
        li.appendChild(deleteBtn);

        noteList.appendChild(li);
    });
}

// Function to delete note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Attach save event after popup creation
document.addEventListener("click", (event) => {
    if (event.target.id === "saveNote") {
        saveNote();
    }
});


