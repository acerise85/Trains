$(document).ready(function () {

  //Database link
  var config = {
    apiKey: "AIzaSyC8D579KSMQFVVBkw3rtp-8-sOhpIxlu_Q",
    authDomain: "train-af789.firebaseapp.com",
    databaseURL: "https://train-af789.firebaseio.com",
    projectId: "train-af789",
    storageBucket: "",
    messagingSenderId: "637559863661"
  };
  firebase.initializeApp(config);
  //database initialization
  var database = firebase.database();

  //Add a train form, takes information from user
  $('#add-train-form').on('submit', function (event) {
    event.preventDefault();
    var trainTime = $('#trainTime').val().trim()
    var timeArray = trainTime.split(":");
    var firstTrainTimeFormatted = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var currentTime = moment().format('HH:mm');

    //Places user information into object for storage on database
    var newTrain = {
      trainName: $('#train-name').val().trim(),
      destination: $('#destination').val().trim(),
      firstTrainTime: trainTime,
      frequency: $('#frequency').val().trim()
    }
    //Push new train to the database
    database.ref('/trains').push(newTrain);

    //Math for frequency of train to calculate the next arrival
    var frequencyFormatted = moment().minutes(frequency).format('mm');
    var nextArrival = moment(firstTrainTimeFormatted, frequency, 'HH:mm').fromNow(true);
  })
  //Logging the trains in the databse and taking a snapshot for persistance of data
  database.ref('/trains').on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    var train = childSnapshot.val().format;

    var dest = childSnapshot.val().destination;

    var time = childSnapshot.val().firstTrainTime;

    var frequency = childSnapshot.val().frequency;

    //Math to calculate next train arival, minutes away and 
    var timeArray = time.split(":");
    var firstTrainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var currentTime = moment().format('HH:mm');
    var maxMoment = moment.max(moment(), firstTrainTime);
    //if loop to see if train has arrived for day or not
    if (maxMoment == firstTrainTime) {
      console.log("Train has not arrived");
      var minutesAway = firstTrainTime.diff(moment(), "minutes");
      var nextArrival = firstTrainTime.format("hh:mm a");
    }
    else {
      var minutesAway = frequency - (moment().diff(firstTrainTime, "minutes") % frequency);
      var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
      console.log("Train has arrived");
    }
    //Displaying train information to DOM
    $('.table tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + firstTrainTime.format("hh:mm a") + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>" + "</td></tr>");

  })
})
