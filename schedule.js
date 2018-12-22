$(document).ready(function (){
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




 
  
  
  $('#add-train-form').on('submit', function (event) {
    event.preventDefault();
    var trainTime = $('#trainTime').val().trim()
    var firstTrainTimeFormatted = moment(trainTime).format('HH:mm')
    
    
    console.log('this is the user value: ' + trainTime)



    // console.log('this is the formatted value: ' + firstTrainTimeFormatted)
    var newTrain = {
      trainName: $('#train-name').val().trim(),
      destination: $('#destination').val().trim(),
      firstTrainTime: trainTime,
      frequency: $('#frequency').val().trim()
    }
    database.ref('/trains').push(newTrain);
    console.log(newTrain)

    var trainTime = moment(firstTrainTimeFormatted, "HH:mm").subtract(1, "years");
    
    var timeNow = moment();
    console.log(timeNow);
  // var nextArrival = moment(minutesLeft);

  // var diff = timeNow.to(nextArrival);
  // console.log(diff)

  // var tDifference = moment().diff(moment(trainTime), "true");

  // var remainingTime = tDifference % frequency;

  // var minutesLeft = moment(frequency - remainingTime, "true");

  

  // console.log("This is the time difference: " + tDifference);
  // console.log("This is the remaining time calculation " + remainingTime);
  // console.log("This is the remaining time before next train " + minutesLeft);
  // console.log("This is the next arrival time " + nextArrival);
  })

database.ref('/trains').on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);



    $('.table tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>"  + "</td><td>"  + "</td><td>" + "</td></tr>");

  })

  
})
