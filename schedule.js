
  var config = {
    apiKey: "AIzaSyC8D579KSMQFVVBkw3rtp-8-sOhpIxlu_Q",
    authDomain: "train-af789.firebaseapp.com",
    databaseURL: "https://train-af789.firebaseio.com",
    projectId: "train-af789",
    storageBucket: "",
    messagingSenderId: "637559863661"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


$('#add-train-form').on('submit', function(event){

    event.preventDefault();

    var newTrain = {
        trainName: $('#train-name').val(),
        destination: $('#destination').val(),
        firstTrainTime: $('#first-train-time').val(),
        frequency: $('#frequency').val()
    }
    database.ref('/trains').push(newTrain);
    console.log(newTrain)
})

database.ref('/trains').on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().frequency);

  
  $('.table tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>"  + childSnapshot.val().firstTrainTime + "</td><td>"+"</td><td>" + childSnapshot.val().frequency + "</td><td>"+"</td></tr>");
  
})
