angular.module('libraryApp')
    .controller('BooksShowController', BooksShowController);

BooksShowController.$inject = ['$http', '$routeParams', '$location'];

function BooksShowController($http, $routeParams, $location) {
    var vm = this;
    var bookId = $routeParams.id;
    vm.editing = false;

    $http({
        method: 'GET',
        url: 'https://super-crud.herokuapp.com/books/' + bookId
    }).then(onBookShowSuccess, onError);

    function onBookShowSuccess(reponse) {
        console.log('success showing books!', response.data);
        vm.book = response.data;
    }

    function onError(error) {
        console.log('show book error: ', error);
    }

    vm.editBook = function() {
        $http({
            method: 'PUT',
            url: 'https://super-crud.herokuapp.com/books/' + $routeParams.id,
            data: {
                title: vm.book.title,
                author: vm.book.author,
                image: vm.book.image,
                releaseDate: vm.book.releaseDate
            }
        }).then(onBookEditSuccess, onError);

        function onBookEditSuccess(response) {
            console.log('successfully updated book: ', bookId, response.data);
            vm.book = response.data;
            $location.path('/');
        }
    };

    vm.deleteBook = function() {
        console.log('someone wants to delete: ');
        $http({
            method: 'DELETE',
            url: 'https://super-crud.herokuapp.com/books/' + $routeParams.id,
        }).then(function(response) {
          $location.path('/');
        });

    };
}
