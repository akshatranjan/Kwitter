//YOUR FIREBASE LINKS
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

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("username");

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            likes:0
      })
      document.getElementById("msg").value = "";
}

function getData()
 { firebase.database().ref("/"+room_name).on('value', function(snapshot)
  { document.getElementById("output").innerHTML = "";
   snapshot.forEach(function(childSnapshot)
    { childKey  = childSnapshot.key;
       childData = childSnapshot.val();
        if(childKey != "purpose") 
        {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         likes = message_data['likes'];
         name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' value="+likes+" id="+firebase_message_id+" onclick='updateLikes(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like:" +likes+ "</span></button><hr>";

         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function updateLikes(message_id)
{
      console.log("Clicked on the like button" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref("/" + room_name).child(message_id).update({
            likes: updated_likes
      });
}

function logout()
{
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}