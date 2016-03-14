var myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            $scope.editData = new Array($scope.todos.length);
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // when submitting the add form, send the text to the node API
    $scope.addTask = function() {
        $http.post('/api/todos', $scope.formData)
            
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.editTask = function(id, index) {
        console.log($scope.editData[index])
        $http.put('/api/todos/' + id, {text: $scope.editData[index]})
            .success(function(data) {
                $scope.editData[index] = '';
                $scope.todos = data;
                console.log(data)
            })
            .error(function(data) {
                $scope.editData[index] = '';
                console.log('Error: ' + data)
            })
    }

    $scope.completeTask = function(id, index) {
        $http.post('/api/todos/' + id)
            .success(function(data) {
                // $scope.editData[index] = '';
                $scope.todos = data;
                console.log(data)
            })
            .error(function(data) {
                // $scope.editData[index] = '';
                console.log('Error: ' + data)
            })
    }
    // delete a todo after checking it
    $scope.deleteTask = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
