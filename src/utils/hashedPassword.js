import bcrypt from "bcryptjs";

const hashedPassword = async (password) => {
  // return new Promise((resolve, reject) => {
  //   bcrypt.genSalt(12, (error, salt) => {
  //     if (error) {
  //       return reject(error);
  //     }

  //     bcrypt.hash(password, salt, (error, hash) => {
  //       if (error) {
  //         return reject(error);
  //       }
  //       resolve(hash);
  //     });
  //   });
  // });
  return await bcrypt.hash(password, 10);
};

export default hashedPassword;
