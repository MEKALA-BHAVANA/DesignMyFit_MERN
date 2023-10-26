const createTokenUser = (user) => {
  return { name: user.Fullname, 
    userId: user._id,
    gmail:user.gmail,
  };
};

module.exports = createTokenUser;
