
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
 
  
  
  
  var firstTrainTimeFormatted = moment(trainTime).format('h:mm')
  
  
  $('#add-train-form').on('submit', function(event){
    
    var trainTime = $('#trainTime').val().trim()
    event.preventDefault();
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
})

database.ref('/trains').on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTrainTime);
  console.log(childSnapshot.val().frequency);

  var fTraintime = moment('#first-train-time',"HH:mm").subtract(1, "years");

  var timeNow = moment();
  
  var tDifference = moment().diff(moment(fTraintime), "minutes");
  
  var remainingTime = tDifference % ("#frequency");
  
  var minutesLeft = moment(("#frequency") - remainingTime);
  
  var nextArrival = moment().add(minutesLeft, "mm");
 
  $('.table tbody').append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>"  + childSnapshot.val().frequency + "</td><td>"+ nextArrival +"</td><td>" + minutesLeft + "</td><td>"+"</td></tr>");
  
})



