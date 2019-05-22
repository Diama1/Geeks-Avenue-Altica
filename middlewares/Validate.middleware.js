import Validations from "../helpers/Validations.helper";

class Validate {
    static validateUser(req, res, next) {
        const { error } = Validations.userValidate(req.body);
        if (error) {
            res.status(400).json({
                status: 400,
                error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
            });
        } else {
            next();
        }
    }

    static validateLogin(req, res, next) {
        const { error } = Validations.loginValidate(req.body);
        if (error) {
            res.status(400).json({
                status: 400,
                error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g, ""),
            });
        } else {
            next();
        }
    }
}

export default Validate;