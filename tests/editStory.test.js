/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";
import getToken from "../helpers/getToken";
import dummyData from "./mockupData/dummyData";
import db from "../models";

chai.use(chaiHttp);

// @Bring In our dummy Data for the purpose of making the Tests
const { user, user1 } = dummyData.users;
const { validArticle, invalidArticle, validComment } = dummyData.updateArticle;
const { Article } = db;

// @ Generate a token to be used - invalid token and the valid token
const token = getToken(user);
const invalidToken = getToken(user1);
describe("PUT /api/articles/:articleId", () => {
    before(async () => {
        await Article.create({
            title: "Dummy article",
            description: "This a dummy one",
            category: "Fun",
            authorid: 1,
            likes: 0,
        });
    });

    it("should return an error message for the invalid articleId provided", () => {
        chai.request(app)
            .patch("/api/v1/articles/1fadfa")
            .set("Authorization", `Bearer ${token}`)
            .send(validArticle)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(400);
                expect(res.body.error).to.deep.equal("Invalid Article ID");
            });
    });

    it("should return an error message if the article is not found", () => {
        chai.request(app)
            .patch("/api/v1/articles/10000")
            .set("Authorization", `Bearer ${token}`)
            .send(validArticle)
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(404);
                expect(res.body.error).to.deep.equal("This Article is not found!");
            });
    });

    it("should return an error message that you are not the owner of the story", () => {
        chai.request(app)
            .patch("/api/v1/articles/1")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(validArticle)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(400);
                expect(res.body.error).to.deep.equal("Sorry! You are not the Owner of This story");
            });
    });

    it("should validate the title,description and category if are string", (done) => {
        chai.request(app)
            .patch("/api/v1/articles/1")
            .set("Authorization", `Bearer ${token}`)
            .send(invalidArticle)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(400);
                expect(res.body.error).to.deep.equal("title must be a string");
                done();
            });
    });

    it("should update successfully the article", () => {
        chai.request(app)
            .patch("/api/v1/articles/1")
            .set("Authorization", `Bearer ${token}`)
            .send(validArticle)
            .end((err, res) => {
                expect(res.body).to.be.an("object");
                expect(res.body.status).to.deep.equal(200);
                expect(res.body.message).to.deep.equal("Article successfully updated...");
            });
    });
});
