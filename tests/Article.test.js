/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import db from "../models";

const {
    User, Article, ArticleLike, Comment,
} = db;

chai.use(chaiHttp);
chai.should();
const { expect } = chai;
let userToken = "";
describe("Article based tests...", () => {
    before(async () => {
        await Article.create({
            title: "Dummy article",
            description: "This a dummy one",
            category: "Fun",
            authorid: 1,
            likes: 0,
        });
    });
    it("sign up user", (done) => {
        chai.request(app)
            .post("/api/v1/auth/signup")
            .send({
                fullNames: "Elie Mugenzi",
                email: "eliemugenzi@andela.com",
                password: "mysecret123",
            })
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });

    it("Should be able to create a new article", (done) => {
        const article = {
            title: "My life at Andela",
            description: "This is Andela, TIA",
            category: "Fun",
        };
        chai.request(app).post("/api/v1/articles")
            .send(article)
            .set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                res.should.have.status(201);
            });
        done();
    });
    it("should be able to view all comments of a specific story", (done) => {
        chai.request(app).get("/api/v1/articles/1/comments").set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an("object");
                res.body.should.have.property("data");
                expect(res.body.data).to.be.an("array");
            });
        done();
    });

    it("should be able to like an article", (done) => {
        chai.request(app).patch("/api/v1/articles/1/like").set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
            });
        done();
    });

    it("should be able to unlike an article", (done) => {
        chai.request(app).patch("/api/v1/articles/1/unlike").set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                console.log(err);
                expect(res.body).to.be.an("object");
            });
        done();
    });

    it("Should be able to delete an article he owns", (done) => {
        chai.request(app).delete("/api/v1/articles/1").set("Authorization", `Bearer ${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
            });
        done();
    });
});
