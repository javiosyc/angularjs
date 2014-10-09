function SelectorController($scope)
{

  $scope.stage = 1;
  
  $scope.switchStage = function() {
    $scope.stage = 
      ($scope.stage == 1) ? 2 : 1;
  };

}