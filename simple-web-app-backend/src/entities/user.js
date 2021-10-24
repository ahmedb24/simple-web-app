export default function buildMakeUser({
  Id,
  md5,
  sanitize,
  validator,
  crypto,
  jwt,
}) {
  return function makeUser({
    id = Id.makeId(),
    name,
    age,
    phone,
    email,
    password,
    passwordDb,
    salt,
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error("User must have a valid id.");
    }
    if (!validator.validateStringByMinLength(name, 5)) {
      throw new Error(
        "User's name must be valid and longer than 5 characters."
      );
    }
    if (
      !validator.validateByRegex(parseInt(age), "age") ||
      !validator.validateNumberByMinLength(parseInt(age), 50)
    ) {
      throw new Error("User's age must be valid and under 50.");
    }
    if (!validator.validateByRegex(phone, "phone")) {
      throw new Error(
        "User's phone number must be valid and of format (+)(234)-[(080|090|070)]-########"
      );
    }
    if (!validator.validateByRegex(email, "email")) {
      throw new Error("User must have a valid email address.");
    }
    if (!validator.validateStringByMinLength(password, 8)) {
      throw new Error(
        "User's password must be valid and longer than 8 characters."
      );
    }
    let sanitizedPassword;
    if (!passwordDb) {
      sanitizedPassword = sanitize(password).trim();
      if (sanitizedPassword.length < 1) {
        throw new Error("User contains no usable password.");
      }
    }
    return Object.freeze({
      getName: () => name,
      getAge: () => age,
      getPhone: () => phone,
      getEmail: () => email,
      getId: () => id,
      getSalt: () => salt || (salt = makeSalt()),
      getPassword: function () {
        return makeHashedPassword(sanitizedPassword, this.getSalt());
      },
      print: () => {
        return { name, age, phone, email, id };
      },
      store: function () {
        return {
          id: id,
          name: name,
          age: age,
          phone: phone,
          email: email,
          salt: salt,
          passwordDb: this.getPassword(),
          salt: this.getSalt(),
        };
      },
      encoded: function () {
        return jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
            ...this.print(),
          },
          process.env.SECRET_KEY
        );
      },
      decoded: async (userJwt) => {
        return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
          if (error) {
            return { error };
          }
          return res;
        });
      },
      comparePassword: function (pass) {
        const sanitizedPasswordFromUser = sanitize(pass).trim();
        const hashedPasswordFromUser = makeHashedPassword(
          sanitizedPasswordFromUser,
          this.getSalt()
        );
        return hashedPasswordFromUser == passwordDb;
      },
    });

    function makeSalt() {
      return crypto.randomBytes(128).toString("base64");
    }
    function makeHashedPassword(password, salt) {
      var hmac = crypto.createHmac("sha256", salt);
      return hmac.update(password).digest("hex");
    }
  };
}
