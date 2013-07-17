
#Main entry point of the application
application = angular.module('application', [])

$scope, $http <- application.controller 'appCtrl' 
$scope.status       = 'ok'

window.main-scope  = $scope
 
<- angular.element(document).ready
$scope.name-project         = 'wmake'
$scope.last-updated         = '6 minutes ago'
$scope.description-coverage = 'Actual coverage'
$scope.v-c                  = '77%'
$scope.who                  = 'V'
$scope.commitStatus = [ {} {} {} ]
$scope.commitStatus[0].messageCommit = 'Changed x y z'
$scope.commitStatus[0].timeCommit    = '20 min'

$scope.commitStatus[1].messageCommit = 'x y z'
$scope.commitStatus[1].timeCommit    = '10 min'

$scope.commitStatus[2].messageCommit = 'x y z'
$scope.commitStatus[2].timeCommit    = '10 min'

$scope.renderAfterInclude = ->
    webcode-toolkit.automate-svg()
