import Joi from "joi";

class Validations {
    static userValidate(user) {
        const schema = Joi.object().keys({
            fullNames: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{6,15}/).required(),
        });

        return Joi.validate(user, schema);
    }

    static loginValidate(user) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]{6,15}/).required(),
        });
        return Joi.validate(user, schema);
    }

    static articleValidate(article) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            category: Joi.string().required(),
        });
        return Joi.validate(article, schema);
    }
}

export default Validations;
