/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
// import db from "../models";

const { expect } = chai;
// const { User } = db;

chai.use(chaiHttp);

describe("Test users controllers", () => {
    it("should create an account", (done) => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send({
                fullNames: "Itetere Brune",
                email: "ITBrune99@getMaxListeners.com",
                password: "BRUNEqwerty!@#",
            })
            .end((err, res) => {
                expect(res.body).to.have.status(201);
                expect(res.body)
                    .to.have.property("message")
                    .equal("you have successfully created an account");
                expect(res.body).to.has.property("data");
                expect(res.body).to.have.property("token");
                done();
            });
    });
    it("should login a user", (done) => {
        chai.request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "ITBrune99@getMaxListeners.com",
                password: "BRUNEqwerty!@#",
            })
            .end((err, res) => {
                expect(res.body).to.have.status(200);
                expect(res.body)
                    .to.have.property("message")
                    .equal("Logged in Successfully");
                expect(res.body).to.have.property("token");
                done();
            });
    });
});
