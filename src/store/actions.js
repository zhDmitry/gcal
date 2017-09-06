const req = require.context(".", true, /\.\/.+\/actions\.js$/);

req.keys().forEach(key => {
  const actions = req(key);
  console.log(actions);
  Object.keys(actions).forEach(name => {
    module.exports[name] = actions[name];
  });
});
