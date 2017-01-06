var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Check Walking Length', function() {

    it('Short Walk', function() {
        expect(isValidWalk(['w'])).to.equal(false);
    });

    it("Long Walk", function() {
        expect(isValidWalk(['w','e','w','e','w','e','w','e','w','e','w','e'])).to.equal(false);
    });
});


describe("Check if Directions return you to Work", function() {

    it("Check Route", function() {
        expect(isValidWalk(['n','s','n','s','n','s','n','s','n','s'])).to.equal(true);
        expect(isValidWalk(['n','s','n','s','n','s','n','W','n','s'])).to.equal(false);
        expect(isValidWalk(['n','e','e','s','n','s','n','s','n','s'])).to.equal(false);
        expect(isValidWalk(['s','s','n','s','n','s','n','s','n','s'])).to.equal(false);
    });


});