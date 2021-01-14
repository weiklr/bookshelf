// 🐨 you don't need to do anything in this file for the exercise. This is
// just here for the extra credit. See the instructions for more info.

// LWK:redirects user to search bar instead of showing link to go home page on first load
module.exports = app => {
  app.get(/^\/$/, (req, res) => res.redirect('/discover'))
}
