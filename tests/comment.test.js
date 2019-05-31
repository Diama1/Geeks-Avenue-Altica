/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import getToken from "../helpers/getToken";
import dummyData from "./mockupData/dummyData";
import db from "../models";

chai.use(chaiHttp);

const { user, user1 } = dummyData.users;
const { validArticle, invalidArticle } = dummyData.updateArticle;
const { Article } = db;
const { expect } = chai;

const token = getToken(user);
const invalidToken = getToken(user1);

describe("comment on an article test", () => {
    before(async () => {
        await Article.create({
            title: "Dummy article",
            description: "This a dummy one",
            category: "Fun",
            authorid: 1,
            likes: 0,
        });
    });

    it("should validate an empty description and send an error", (done) => {
        chai.request(app)
            .post("/api/v1/articles/1/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({
                description: "",
            })
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(400);
                expect(res.body).to.have.property("error").eql("description is not allowed to be empty");
                done();
            });
    });

    it("should not post the comment on an article which is not available", (done) => {
        chai.request(app)
            .post("/api/v1/articles/4/comments")
            .send({
                description: "this is a good article",
            })
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(404);
                expect(res.body).to.have.property("message").eql("Article you want to comment on is not available!");
                done();
            });
    });

    it("should not post the comment on an article which is not available", (done) => {
        chai.request(app)
            .post("/api/v1/articles/1/comments")
            .send({
                description: "this is a good article",
            })
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(201);
                expect(res.body).to.have.property("message").eql("success");
                done();
            });
    });

    it("should be able to get all the comments", (done) => {
        chai.request(app)
            .get("/api/v1/articles/1/comments")
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(200);
                expect(res.body).to.have.property("data").to.be.an("array");
                done();
            });
    });

    it("should be able to update a comment", (done) => {
        chai.request(app)
            .patch("/api/v1/articles/1/comments/1")
            .set("Authorization", `Bearer ${token}`)
            .send({
                description: "yeah you deserve better",
            })
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(200);
                expect(res.body).to.have.property("message").eql("Comment successfully updated!");
                done();
            });
    });

    it("should be able to update a comment and not the owner", (done) => {
        chai.request(app)
            .patch("/api/v1/articles/1/comments/1")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({
                description: "yeah you deserve better",
            })
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(403);
                expect(res.body).to.have.property("error").eql("You are not allowed to modify this comment!");
                done();
            });
    });

    it("should be able to update a comment and not find the comment", (done) => {
        chai.request(app)
            .patch("/api/v1/articles/1/comments/2")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({
                description: "yeah you deserve better",
            })
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(404);
                expect(res.body).to.have.property("error").eql("That comment is not available");
                done();
            });
    });

    it("should be able to update a comment and not find the article", (done) => {
        chai.request(app)
            .patch("/api/v1/articles/2/comments/2")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({
                description: "yeah you deserve better",
            })
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(404);
                expect(res.body).to.have.property("error").eql("The article is not available!");
                done();
            });
    });

    it("should be able to get his single comment", (done) => {
        chai.request(app)
            .get("/api/v1/articles/1/comments/1")
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(200);
                expect(res.body).to.have.property("data").to.be.an("object");
                done();
            });
    });

    it("should not be able to get single Comment on invalid article", (done) => {
        chai.request(app)
            .get("/api/v1/articles/1/comments/9")
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(404);
                expect(res.body).to.have.property("message").to.eql("no comment found");
                done();
            });
    });

    it("should be able to delete a single comment", (done) => {
        chai.request(app)
            .delete("/api/v1/articles/1/comments/1")
            .set("Authorization", `Bearer ${token}`)
            .end((err, res) => {
                expect(res.body).to.have.property("status").eql(200);
                expect(res.body).to.have.property("message").to.eql("Comment deleted successfully!");
                done();
            });
    });
});
