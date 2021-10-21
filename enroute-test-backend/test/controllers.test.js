let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = chai.expect;
const controllers = require('./../src/controllers/index');
const app = require('./../src/index');

describe('Controllers', () => {
    beforeEach(async function() {
        chai.use(chaiHttp);
    })
    describe("GET /employeesExample", function () {
        it("should return 200 OK with several employees", async function () {
            const url = 'http://localhost:3000';
            chai.request(url)
                .get("/employeesExample")
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body.dataset).to.be.an("array");
                });
        });
    });
});
