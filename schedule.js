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
    var timeArray =  trainTime.split(":");
    var firstTrainTimeFormatted = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var currentTime = moment().format('HH:mm');
    console.log("CurrentTime: " + currentTime);
    
   
    
    
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
    var frequencyFormatted = moment().minutes(frequency).format('mm');
    var nextArrival = moment(firstTrainTimeFormatted, frequency, 'HH:mm').fromNow(true);
    console.log("Next Arrival: " + nextArrival);

    console.log("This is the formateed frequency: " + frequencyFormatted)

    // var trainTime = moment(firstTrainTimeFormatted, "HH:mm").subtract(1, "years");
    
    // var timeNow = moment();
    // console.log(timeNow);
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
    var train = childSnapshot.val().format;
    console.log(childSnapshot.val().trainName);

    var dest = childSnapshot.val().destination;
    console.log(childSnapshot.val().destination);

    var time = childSnapshot.val().firstTrainTime;
    console.log(childSnapshot.val().firstTrainTime);

    var frequency = childSnapshot.val().frequency;

    var timeArray =  time.split(":");
    var firstTrainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    var currentTime = moment().format('HH:mm');
    var maxMoment = moment.max(moment(), firstTrainTime);
      if (maxMoment == firstTrainTime){
        console.log("Train has not arrived");
        var minutesAway = firstTrainTime.diff(moment(), "minutes");
        var nextArrival = firstTrainTime.format("hh:mm a");
      }
      else {
        var minutesAway = frequency - (moment().diff(firstTrainTime, "minutes") % frequency);
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
        console.log("Train has arrived");
      }

    $('.table tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>"+ firstTrainTime.format("hh:mm a") + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>" + "</td></tr>");

  })

  
})
