    var config = {
        apiKey: "AIzaSyBq1mwk_9ku0Mgk2hd3aFmmEdEOAQ2kav8",
        authDomain: "train-schedule-eb4b7.firebaseapp.com",
        databaseURL: "https://train-schedule-eb4b7.firebaseio.com",
        projectId: "train-schedule-eb4b7",
        storageBucket: "train-schedule-eb4b7.appspot.com",
        messagingSenderId: "392848669561"
    };

    firebase.initializeApp(config);

    function Train(name, destination, firstTrain, frequency) {
        this.name = name;
        this.destination = destination;
        this.firstTrain = firstTrain;
        this.frequency = frequency;
    }

    // Get a reference to the database service
    var database = firebase.database();

    $("#submit").on("click", function(event) {
        //prevents it from auto submitting

        event.preventDefault();

        // Get updated values from the inputs before saving
        trainName = $("#train-name").val();
        destination = $("#destination").val();
        firstTrain = $("#first-train-time").val();
        frequency = $("#frequency").val();

        console.log("train name: " + trainName);
        console.log("destination: " + destination);
        console.log("first train: " + firstTrain);
        console.log("frequency: " + frequency);

        var nextTrain = new Train(trainName, destination, firstTrain, frequency);

        database.ref().push(nextTrain);
    });

    database.ref().on("child_added", function(childSnapshot) {

        let trainName = childSnapshot.val().trainName;


        let then = moment(childSnapshot.val().startTime).format("HH:mm:ss");
        let now = moment().subtract(1, 'days').format('h:mm:ss');
        let duration = moment.utc(moment(now, "HH:mm:ss").diff(moment(then, "HH:mm:ss"))).format("HH:mm:ss");
        console.log("Last time" + then);
        console.log("Current time" + now);
        console.log("duration: " + duration);


        // let arrivingTrain = (duration * )

        $("#train-table").append(`"<tr><td id='name'>${childSnapshot.val().name}</td><td id='destination'>${childSnapshot.val().destination}</td><td id='startTime'>${childSnapshot.val().startTime}</td><td id='frequency'>${frequency}</td><td id='duration'>${childSnapshot.val().duration}</td>"`);
    }, function(errorObject) {
        console.log("There's been an error: " + errorObject.code);
    });
