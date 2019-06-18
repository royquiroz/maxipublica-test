exports.validateEmail = (email, res) => {
  let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailRegex.test(String(email).toLowerCase())) {
    return res.status(400).json({
      msg: "El email no es valido"
    });
  }
};
