var db;
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('PhonelistsCtrl',  ['$scope', '$cordovaSQLite', function($scope, $cordovaSQLite) {
  console.log("ola")
  $scope.playlists = [
    { title: 'Reggae', id: 1,show: false },
    { title: 'Chill', id: 2,show: false },
    { title: 'Dubstep', id: 3,show: false },
    { title: 'Indie', id: 4,show: false },
    { title: 'Rap', id: 5,show: false },
    { title: 'Cowbell', id: 6,show: false }
  ];

  $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: true
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;

    $scope.save("ola mundo")

  };



  $scope.isGroupShown = function(group) {
    return group.show;
  }



 // db = $cordovaSQLite.openDB({name:"nextflow.db",location:'default'});
    $scope.save = function(newMessage) {

      if (window.cordova) {
        // Dispositivo
        db = $cordovaSQLite.openDB({
          name: "my.db",
          location: 'default'
        });
      } else {
        // Ionic serve
        db = window.openDatabase("my.db", "1.0", "My app", -1);
        
      }
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');


        // execute INSERT statement with parameter
        $cordovaSQLite.execute(db, 'INSERT INTO Messages (message) VALUES (?)', [newMessage])
            .then(function(result) {
                $scope.statusMessage = "Message saved successful, cheers!";

                $cordovaSQLite.execute(db, 'SELECT * FROM Messages ORDER BY id DESC')
                .then(
                    function(res) {
    
                      console.log(res)
                        if (res.rows.length > 0) {
    
                            $scope.newMessage = res.rows.item(0).message;
                            $scope.statusMessage = "Message loaded successful, cheers!";
                        }
                    },
                    function(error) {
                        $scope.statusMessage = "Error on loading: " + error.message;
                    }
                );


            }, function(error) {
                $scope.statusMessage = "Error on saving: " + error.message;
            })

    }

  }])

.controller('PhoneDetailCtrl', function($scope, $stateParams) {
})