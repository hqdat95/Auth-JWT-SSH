export default (user, publicKey) => {
  return {
    id: user.id,
    publicKey: publicKey,
  };
};
