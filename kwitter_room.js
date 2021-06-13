var firebaseConfig = {
      apiKey: "AIzaSyBxtv5wIwvUDal63XtIJ7DB7rup-gBqTfM",
      authDomain: "kwitter-ab254.firebaseapp.com",
      databaseURL: "https://kwitter-ab254-default-rtdb.firebaseio.com",
      projectId: "kwitter-ab254",
      storageBucket: "kwitter-ab254.appspot.com",
      messagingSenderId: "638159772050",
      appId: "1:638159772050:web:df354159237f695046094b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

function addRoom()
{
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose : "adding room_name"
      });
      localStoroge.setItem("room_name", room_name);

      window.location = "kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>"
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location.replcae("index.hmtl");
}