var app = angular.module("WalkApp", ['ngAnimate']); // module init
app.controller("WalkController", function($scope) { // controller init


    $scope.message = "Add Walking Directions";
    $scope.walkArray = [];
    $scope.disableDirectionButtons = false;
    $scope.walkLabels = [
        {label: 'North', spec: 'N'},
        {label: 'South', spec: 'S'},
        {label: 'East', spec: 'E'},
        {label: 'West', spec: 'W'}
    ];
    $scope.dirPercentage = 0;
    $scope.dirPercentageMessage = "0%";

    $scope.barWidth = {
        'width': $scope.dirPercentageMessage
    };

    $scope.completedBar = false;

    $scope.writtenDirections = [];
    $scope.randomStreets = [
        "LakeWood Ave",
        "Crescent Blvd",
        "Willow Dr",
        "Loopy Lane",
        "Hallsbury Cir",
        "45th St",
        "Venice Blvd",
        "Park Ave",
        "Willsburg Cir",
        "42th St",
        "Matching Blvd",
        "Kensie Ave",
        "Firewood St"
    ];

    $scope.directionSynonyms = [
        "Head",
        "Go",
        "Turn",
        "Travel"
    ];


    $scope.add = function (direction) {

        // add direction to array
        $scope.temp = {id: $scope.walkArray.length, label: direction.label, spec: direction.spec};

        $scope.walkArray.push($scope.temp);
        console.log($scope.walkArray);

        $scope.stepsLeft = 10 - $scope.walkArray.length;

        if ($scope.stepsLeft == 1) {
            $scope.message = "Add " + $scope.stepsLeft + " More Direction";
        } else {
            $scope.message = "Add " + $scope.stepsLeft + " More Directions";
        }

        $scope.checkArrayLength();
        $scope.addWrittenDirections(direction.label);
        $scope.updatePercentage("add");
    };

    $scope.remove = function (id) {

        // remove from walking array
        console.log(id);
        $scope.walkArray.splice(id, 1);
        $scope.writtenDirections.splice(id, 1);
        console.log($scope.walkArray);

        $scope.stepsLeft = 10 - $scope.walkArray.length;
        console.log($scope.stepsLeft);
        if ($scope.stepsLeft == 1) {
            $scope.message = "Add " + $scope.stepsLeft + " More Direction";
        } else {
            $scope.message = "Add " + $scope.stepsLeft + " More Directions";
        }

        $scope.checkArrayLength();
        $scope.updatePercentage("sub");
    };

    $scope.clearWalk = function () {
        $scope.walkArray = [];
        $scope.writtenDirections = [];
        $scope.checkArrayLength();
        $scope.updatePercentage("clear");
        $scope.message = "Directions Cleared";
        console.log("Array Cleared");
    };

    $scope.checkWalk = function (route) {

        var walk = [];
        for (var i = 0; i < route.length;++i) {
            walk.push(route[i].spec);
        }

        console.log(walk);
        $scope.isValidWalk(walk);


    };

    $scope.isValidWalk = function (walk) {
        // walk should not be too short or too long
        if (walk.length != 10) {
            return false;
        }

        // needs to return you to your starting point
        var walkBack = walk.splice(5,9);
        //console.log(walk);
        //console.log(walkBack);

        var horizontal = 0;
        var vertical = 0;

        for (var i = 0; i < walk.length; ++i) {

            if (walk[i] == walkBack[i]) {
                $scope.message = "You got lost on your way back to work.";
                return false;
            }

            if (walk[i] == "e" || walkBack[i] == "e") {
                horizontal += 1;
            }
            if (walk[i] == "w" || walkBack[i] == "w") {
                horizontal -= 1;
            }
            if (walk[i] == "n" || walkBack[i] == "n") {
                vertical += 1;
            }
            if (walk[i] == "s" || walkBack[i] == "s") {
                vertical -= 1;
            }
        }

        //console.log("Vertical: ", vertical);
        //console.log("horizontal: ", horizontal);

        if (vertical == 0 && horizontal == 0) {
            $scope.message = "Great Walk! You Have Made it back to the office.";
            return true;
        }

        return false;
    };

    $scope.checkArrayLength = function () {
        if ($scope.walkArray.length >= 10) {
            $scope.disableDirectionButtons = true;
            $scope.message = "Check Your Directions";
            $scope.completedBar = true;
        } else {
            $scope.disableDirectionButtons = false;
            $scope.completedBar = false;
        }
    };

    $scope.updatePercentage = function (type) {
        if (type == "add") {
            $scope.dirPercentage += 10;
        } else if (type == "sub") {
            $scope.dirPercentage -= 10;
        } else if (type == "clear") {
            $scope.dirPercentage = 0;
        }

        $scope.dirPercentageMessage = $scope.dirPercentage + "%";

        $scope.barWidth = {
            'width': $scope.dirPercentageMessage
        };
    };

    $scope.addWrittenDirections = function (direction) {
        var randomnumber = Math.ceil(Math.random()*12);
        var randomnumberSyn = Math.ceil(Math.random()*3);
        //console.log($scope.randomStreets[randomnumber]);

        $scope.temp = {
            street: $scope.randomStreets[randomnumber],
            direction: direction,
            syn: $scope.directionSynonyms[randomnumberSyn]
        };

        $scope.writtenDirections.push($scope.temp);

        //console.log($scope.writtenDirections);
    };



});