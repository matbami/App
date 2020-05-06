/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();
// App.controller("home", function (page) {
// $(document).ready(function () {
//   var rootUrl = " https://blogar.000webhostapp.com/";
//   const url = ` ${rootUrl}/wp-json/wp/v2/posts`;
//   var tokenUrl = ` ${rootUrl}/wp-json/jwt-auth/v1/token`;

//   var adminDet = {
//     username: "adelekeayobami13@gmail.com",
//     password: "godisgood2020",
//   };

//   var token;
//   loadData();

//   $.post(tokenUrl, adminDet, function (data, status) {
//     console.log("token: " + data.token);
//     token = data.token;
//   });

//   function loadData() {
//     $.getJSON(url, function (data) {
//       console.log(data);

//       $("#spinner").remove();
//       $("#mainDiv").empty();

//       for (var i = 0; i < data.length; i++) {
//         var div = document.createElement("div");
//         div.innerHTML = `
//       <div class="card pt-1">
//       <div class="card-body">
//       <h4 class="card-title">${data[i].title.rendered}</h4>
//       <p class="card-text textwrap">${data[i].content.rendered}</p>
//       </div>
//       </div>
//       `;
//         $("#mainDiv").append(div);
//       }
//     });
//   }
//   $("form").submit(function (event) {
//     event.preventDefault();

//     var formData = {
//       title: $(" input[name=title] ").val(),
//       content: $(" textarea[name=content] ").val(),
//       status: "publish",
//     };
//     console.log(formData);
//     $.ajax({
//       url: url,
//       method: "POST",
//       data: JSON.stringify(formData),
//       // data: { title: "John", content: "Boston" },
//       crossDomain: true,
//       contentType: "application/json",
//       headers: {
//         Authorization: " Bearer " + token,
//       },
//       success: function (data) {
//         console.log(data);

//         loadData();
//       },
//       error: function (error) {
//         console.log(error);
//       },
//     });
//   });
// });
// });

// App.controller("page2", function (page) {
//   // put stuff here
// });

// try {
//   App.restore();
// } catch (err) {
//   App.load("home");
// }

App.controller("home", function (page) {
  $(document).ready(function () {
    var rootUrl = "https://blogar.000webhostapp.com/";

    const url = ` https://blogar.000webhostapp.com/wp-json/wp/v2/users`;

    var tokenUrl = ` ${rootUrl}wp-json/jwt-auth/v1/token`;

    var adminDet = {
      username: "admin",
      password: "godisgood2020",
    };

    var token;
    // loadData()

    $.post(tokenUrl, adminDet, function (data, status) {
      console.log("token: " + data.token);
      token = data.token;
    });

    $("form").submit(function (event) {
      event.preventDefault();

      var formData = {
        username: $(" input[name=username] ").val(),
        // lastname: $(" input[name=lastname] ").val(),
        email: $(" input[name=email] ").val(),

        password: $(" input[name=password] ").val(),
      };
      console.log(formData);

      // console.log(kit);

      $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(formData),
        crossDomain: true,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          console.log(data);
        },

        error: function (error) {
          console.log(error);
        },
      });
    });
  });
});

App.controller("page2", function (page) {
  $(document).ready(function () {
    var rootUrl = "https://blogar.000webhostapp.com/";

    const url = ` https://blogar.000webhostapp.com/wp-json/wp/v2/posts`;

    var tokenUrl = ` ${rootUrl}/wp-json/jwt-auth/v1/token`;

    var adminDet = {
      username: "admin",
      password: "godisgood2020",
    };

    var token;
    loadData();

    // console.log(token);

    $.post(tokenUrl, adminDet, function (data, status) {
      console.log("token: " + data.token);
      token = data.token;
    });

    function loadData() {
      $.getJSON(url, function (data) {
        console.log(data);

        $("#spinner").remove();

        $("#mainDiv").empty();

        for (var i = 0; i < data.length; i++) {
          var div = document.createElement("div");
          div.innerHTML = `
 <div class="card pt-1">
 <div class="card-body">
 <h4 class="card-title">${data[i].title.rendered}</h4>
 <p class="card-text textwrap">${data[i].content.rendered}</p>
 </div>
 </div>
 `;
          $("#mainDiv").append(div);
        }
      });
    }
    /**
     * on form submission
     * submits the required parameters to create a new post in the
     * wordpress blog
     */
    document
      .getElementById("cameraTakePicture")
      .addEventListener("click", cameraTakePicture);

    function cameraTakePicture() {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
      });

      function onSuccess(imageData) {
        var image = document.getElementById("myImage");
        image.src = "data:image/jpeg;base64," + imageData;
      }

      function onFail(message) {
        alert("Failed because: " + message);
      }
    }

    $("form").submit(function (event) {
      event.preventDefault();
      var categoryTerm = document.getElementById("post_category").value;
      var formData = {
        title: $(" input[name=title] ").val(),
        content: $(" textArea[name=content] ").val(),
        status: "publish",
        categories: [3],
      };
      console.log(formData);

      $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(formData),
        crossDomain: true,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          console.log(data);

          /**
           * refreshes app-content to display latest posts
           */
          loadData();
        },

        error: function (error) {
          console.log(error);
        },
      });
    });
  });
});
try {
  App.restore();
} catch (err) {
  App.load("home");
}
