/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import getToken from "../helpers/getToken";
import dummyData from "./mockupData/dummyData";
import app from "../app";

chai.use(chaiHttp);
chai.should();
const { user, user1 } = dummyData.users;
const { validArticle, invalidArticle } = dummyData.updateArticle;
const token = getToken(user);

describe("LIKE/UNLIKE TESTS...", () => {
    beforeEach("Create an article", (done) => {
        chai.request(app).post("/api/v1/articles").send(validArticle).set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                done();
            });
    });

    it("Should be able to like an article", (done) => {
        chai.request(app).patch("/api/v1/articles/3/like").set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                // console.log(res.body);
                res.should.have.status(200);
            });
        done();
    });
    it("should be able to unlike the article", (done) => {
        chai.request(app).patch("/api/v1/articles/3/unlike").set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
            });
        done();
    });

    it("should be able not to unlike again", (done) => {
        chai.request(app).patch("/api/v1/articles/3/unlike").set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
            });
        done();
    });

    it("should provide an error if article id is not valid when liking", (done) => {
        chai.request(app).patch("/api/v1/articles/3fgg/like").set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
            });
        done();
    });

    it("should provide an error if an article id is invalid when unliking", (done) => {
        chai.request(app).patch("/api/v1/articles/56gf/unlike").set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(400);
            });
        done();
    });

    it("should be able to view article likers", (done) => {
        chai.request(app).get("/api/v1/articles/3/likes").end((err, res) => {
            res.should.have.status(200);
        });
        done();
    });
    it("should throw an error when providing the invalid article id when getting article likers", (done) => {
        chai.request(app).get("/api/v1/articles/34fg/likes").end((err, res) => {
            res.should.have.status(400);
        });
        done();
    });
});
