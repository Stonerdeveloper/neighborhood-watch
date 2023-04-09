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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const dbRef = firebase.database().ref("safe/incidents");

// Get a reference to the form element in the HTML document
const form = document.getElementById('incident-form');

// Listen for the submit event on the form
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting and refreshing the page
  event.preventDefault();

  // Get the values of the form fields
  const title = form.title.value;
  const description = form.description.value;
  const location = form.location.value;
  const image = form.image.files[0];

  // Create a new incident object
  const incident = {
    title: title,
    description: description,
    location: location
  };

  // Push the incident object to the Firebase Realtime Database
  const newIncidentRef = dbRef.push(incident);

  // Upload the incident image to Firebase Storage
  if (image) {
    const storageRef = firebase.storage().ref(newIncidentRef.key + '/' + image.name);
    const uploadTask = storageRef.put(image);
    uploadTask.on('state_changed', function(snapshot) {
      // Track the upload progress here
    }, function(error) {
      console.error('Error uploading image: ', error);
    }, function() {
      // Get the download URL of the uploaded image and update the incident object
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        newIncidentRef.update({image: downloadURL});

        // Show a pop-up notification
        if (Notification.permission === "granted") {
          new Notification("New incident posted!");
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
              new Notification("New incident posted!");
            }
          });
        }
      });
    });
  } else {
    // Show a pop-up notification
    if (Notification.permission === "granted") {
      new Notification("New incident posted!");
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          new Notification("New incident posted!");
        }
      });
    }
  }

  // Reset the form
  form.reset();
});
