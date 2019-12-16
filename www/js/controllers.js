var db;
angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {



  })



  .controller('PhonelistsCtrl', ['$scope', '$cordovaSQLite', function ($scope, $cordovaSQLite) {
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
    $scope.select = function () {
      $scope.contacts = []
      $cordovaSQLite.execute(db, 'SELECT * FROM Contact ORDER BY name ASC')
        .then(
          function (res) {
            for (let index = 0; index < res.rows.length; index++) {
              $scope.contacts.push({ id: res.rows[index].id, name: res.rows[index].name, number: res.rows[index].number })

            }

          },
          function (error) {
            console.log(error)
          }
        );
    }


    $scope.select()

    $scope.toggleContact = function (phone) {
      phone.show = !phone.show;
    };


    $scope.isContactShown = function (group) {
      return group.show;
    }


    $scope.delete = function (id) {

      $cordovaSQLite.execute(db, "DELETE FROM Contact WHERE id = (?)", [id]).then(function (result) {
        $scope.select()
      })

    }

    $scope.searchText = ''

  }])

  .controller('PhoneDetailCtrl',['$scope', '$cordovaSQLite', '$ionicHistory','$stateParams', function ($scope, $cordovaSQLite, $ionicHistory,$stateParams) {
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


    $scope.select = function (id) {

      $cordovaSQLite.execute(db, "SELECT * FROM Contact WHERE id = (?)", [id]).then(function (result) {
        $scope.contact = {
          name: result.rows[0].name,
          number: result.rows[0].number,
          id:result.rows[0].id
        };

      })

    }

    
    $scope.select($stateParams.phonedetailId)


    $scope.finish = function (){

      $cordovaSQLite.execute(db,'UPDATE Contact SET name = (?), number = (?)  WHERE id = (?)',[$scope.contact.name,$scope.contact.number,$scope.contact.id])
        .then(
          function (res) {
            $ionicHistory.goBack();
          },
          function (error) {
            console.log(error)
          }
        );
}

  }])

  .controller('PhoneAddCtrl', ['$scope', '$cordovaSQLite', '$ionicHistory', function ($scope, $cordovaSQLite, $ionicHistory) {

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

    $scope.contact = {
      name: '',
      phone: ''
    };

    $scope.myGoBack = function () {

      $ionicHistory.goBack();
    };

    $scope.finish = function () {
      var parameters = [$scope.contact.name, $scope.contact.number];
      $cordovaSQLite.execute(db, 'INSERT INTO Contact (name,number) VALUES (?,?)', parameters)
        .then(function (result) {
          $ionicHistory.goBack();
        })


    };

    $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number TEXT)');

  }])