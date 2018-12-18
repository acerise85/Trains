
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

