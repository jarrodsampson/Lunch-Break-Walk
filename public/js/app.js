var app = angular.module("WalkApp", ['ngAnimate', 'ngToast']); // module init
app.controller("WalkController", function($scope, ngToast) { // controller init

    $scope.lastDirection = "";
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
    $scope.randomStreetsEW = [
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

    $scope.randomStreetsNS = [
        "LakeHarry Ave",
        "Crest Blvd",
        "Wilson Dr",
        "Lovers Lane",
        "Slauson Cir",
        "199th St",
        "Abbot Kinney Blvd",
        "Westerly Ave",
        "Matterson Cir",
        "2nd St",
        "Hastings Blvd",
        "Rock Ave",
        "Trust St"
    ];

    $scope.directionSynonyms = [
        "Head",
        "Go",
        "Turn",
        "Travel"
    ];

    // image helper
    $scope.successful = false;
    $scope.unsuccessful = true;


    $scope.add = function (direction) {

        if ($scope.lastDirection == direction.label) {

            ngToast.create({
                className: 'danger',
                content: '<i class="fi-check"> Try Alternating Directions.'
            });

        } else {
            $scope.lastDirection = direction.label;

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

            ngToast.create({
                className: 'success',
                content: '<i class="fi-check"> ' + direction.label + ' Direction Added.'
            });
        }

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

        ngToast.create({
            className: 'warning',
            content: '<i class="fi-x"> Direction Removed.'
        });
    };

    $scope.clearWalk = function () {
        $scope.walkArray = [];
        $scope.writtenDirections = [];
        $scope.successful = false;
        $scope.unsuccessful = true;
        $scope.lastDirection = "";
        $scope.checkArrayLength();
        $scope.updatePercentage("clear");
        $scope.message = "Directions Cleared";
        console.log("Array Cleared");

        ngToast.create({
            className: 'success',
            content: '<i class="fi-check"> Directions Cleared.'
        });
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

        var dx = 0;
        var dy = 0;
        var dt = walk.length;

        for (var i = 0; i < walk.length; i++) {
            switch (walk[i]) {
                case 'N': dy--; break;
                case 'S': dy++; break;
                case 'W': dx--; break;
                case 'E': dx++; break;
            }
        }

        var statement = dt === 10 && dx === 0 && dy === 0;

        if (statement) {

            $scope.successful = true;
            $scope.unsuccessful = false;

            $scope.message = "Great Walk! You Have Made it back to the office.";
        } else {
            $scope.message = "You got lost on your way back to work.";
        }

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

        if (direction == 'West' || direction == 'East') {

            $scope.temp = {
                street: $scope.randomStreetsEW[randomnumber],
                direction: direction,
                syn: $scope.directionSynonyms[randomnumberSyn]
            };
        }
        else if (direction == 'North' || direction == 'South') {

            $scope.temp = {
                street: $scope.randomStreetsNS[randomnumber],
                direction: direction,
                syn: $scope.directionSynonyms[randomnumberSyn]
            };

        }



        $scope.writtenDirections.push($scope.temp);

        //console.log($scope.writtenDirections);
    };



});