import bcrypt from "bcrypt";

class HashHelper {
    static hashPassword(password) {
        return bcrypt.hashSync(password, 8);
    }

    static comparePassword(password, passwordToCompare) {
        return bcrypt.compareSync(password, passwordToCompare);
    }
}

export default HashHelper;
