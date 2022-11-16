const signupValidation = () => {
  let password = "";
  const validationSchema = {
    username(value) {
      if (!value) return "null";
      const regex = /^[A-Z][A-Z0-9_]{3}/i;
      if (!regex.test(value)) {
        return "error";
      }
      return true;
    },
    email(value) {
      if (!value) {
        return "null";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;
      if (!regex.test(value)) {
        return "error";
      }
      return true;
    },
    password(value) {
      if (!value) return "null";
      if (value.length < 8) return "error";
      password = value;
      return true;
    },
    confirmPassword(value) {
      if (!value) return "null";
      if (value.length < 8) return "error";
      if (password !== value) return "error";
      return true;
    },
  };
  return { validationSchema };
};

const signinValidation = () => {
  const validationSchema = {
    email(value) {
      if (!value) {
        return "null";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;
      if (!regex.test(value)) {
        return "error";
      }
      return true;
    },
    password(value) {
      if (!value) return "null";
      if (value.length < 8) return "error";
      return true;
    },
  };
  return { validationSchema };
};

const recipeValidation = () => {
  const validationSchema = {
    title(value) {
      if (!value) return "please provide a value!";
      if (value.length < 2) {
        return "title at list should contain 2 characters!";
      }
      return true;
    },
    description(value) {
      if (!value) {
        return "please provide a value!";
      }
      if (value.length < 7) {
        return "description at list should contain 7 characters!";
      }
      return true;
    },
    cooksnotes(value) {
      return true;
    },
    time(value) {
      if (!value) return "please provide a time in number!";
      if (Object.is(value, NaN)) return "plese input a correct number!";
      return true;
    },
  };
  return { validationSchema };
};

const ingredientsValidation = () => {
  const validationSchema = {
    ingredient(value) {
      if (!value) {
        return "please provide a value!";
      }
      if (value.length < 1) {
        return "ingredient name at list should contain 2 characters!";
      }
      return true;
    },
  };
  return { validationSchema };
};

const stepsValidation = () => {
  const validationSchema = {
    description(value) {
      if (!value) {
        return "please provide a value!";
      }
      if (value.length < 7) {
        return "setp description at list should contain 7 characters!";
      }
      return true;
    },
  };
  return { validationSchema };
};

export {
  signupValidation,
  signinValidation,
  recipeValidation,
  ingredientsValidation,
  stepsValidation,
};
