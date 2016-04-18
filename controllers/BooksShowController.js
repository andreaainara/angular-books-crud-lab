angular.module('libraryApp')
    .controller('BooksShowController', BooksShowController);

BooksShowController.$inject = ['$http', '$routeParams', '$location'];

function BooksShowController($http, $routeParams, $location) {
    var vm = this;
    var bookId = $routeParams.id;

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

    vm.updateBook = function(bookToUpdate) {
        console.log('someone wants to update: ', booktToUpdate);
        $http({
            method: 'PUT',
            url: 'https://super-crud.herokuapp.com/books/' + bookToUpdate._id,
            data: {
                title: bookToUpdate.title,
                author: bookToUpdate.author,
                image: bookToUpdate.image,
                releaseDate: booktToUpdate.releaseDate
            }
        }).then(onBookUpdateSuccess, onError);

        function onBookUpdateSuccess(response) {
            console.log('successfully updated book: ', bookId, response.data);
            vm.book = response.data;
            $location.path('/');
        }
    };

    vm.deleteBook = function(bookToDelete) {
        console.log('someone wants to delete: ', bookToDelete);
        $http({
            method: 'DELETE',
            url: 'https://super-crud.herokuapp.com/books/' + bookToDelete._id,
        }).then(onBookDeleteSuccess, onError);

        function onBookDeleteSuccess(response) {
            console.log('book delete response data: ', response.data);
            $location.path('/');
        }
    };
}
