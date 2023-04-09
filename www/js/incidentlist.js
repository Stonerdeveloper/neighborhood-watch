// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAxLeE-RshYpF-ZCavWN7S-J6sW7M5E6D0",
  authDomain: "safezone-d9564.firebaseapp.com",
  databaseURL: "https://safezone-d9564-default-rtdb.firebaseio.com",
  projectId: "safezone-d9564",
  storageBucket: "safezone-d9564.appspot.com",
  messagingSenderId: "1032953998261",
  appId: "1:1032953998261:web:6e32bb929bff7905d007fc",
  measurementId: "G-E0GMYPP37L"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const dbRef = firebase.database().ref("safe");

// Get a reference to the incident list container in the HTML document
var incidentList = document.getElementById('incident-list');

// Listen for changes to the incidents node in the Firebase Realtime Database
dbRef.on('value', function(snapshot) {
  // Clear the incident list container
  incidentList.innerHTML = '';

  snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();

    // Create an incident card for each incident in the database
    var incidentCard = document.createElement('div');
    incidentCard.classList.add('card');
    incidentCard.classList.add('mb-3');
    incidentList.appendChild(incidentCard);

    // Create a card body for the incident card
    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    incidentCard.appendChild(cardBody);

    // Add the incident title to the card body
    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = childData.title;
    cardBody.appendChild(title);

    // Add the incident description to the card body
    var description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = childData.description;
    cardBody.appendChild(description);

    // Add the incident location to the card body
    var location = document.createElement('p');
    location.classList.add('card-text');
    location.textContent = childData.location;
    cardBody.appendChild(location);

    // Create an image element for the incident image
    var image = document.createElement('img');
    image.classList.add('card-img-top');
    image.style.width = '100%';
    image.alt = 'Incident Image';

    // Get the download URL of the incident image from Firebase Storage
    var storageRef = firebase.storage().ref(childData.image);
    storageRef.getDownloadURL().then(function(url) {
      image.src = url;
    }).catch(function(error) {
      console.error('Error getting download URL: ', error);
    });

    // Add the image element to the card body
    cardBody.appendChild(image);
  });
}, function(error) {
  console.error('Error fetching incidents: ', error);
});
