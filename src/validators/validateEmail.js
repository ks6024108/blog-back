const validateEmail = (email) => {
  const result = email.match(/.,`~@!#$%^&*()&{}<>,.??'";:[0-9]/) //change to proper
  return result
}

export default validateEmail