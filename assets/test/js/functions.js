function isValidWalk(walk) {

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
            //$scope.message = "You got lost on your way back to work.";
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
        //$scope.message = "Great Walk! You Have Made it back to the office.";
        return true;
    }

    return false;

}