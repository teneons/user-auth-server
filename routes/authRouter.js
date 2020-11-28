const {Router} = require('express');
const router = Router();


//sign UP
router.post('/signup', async (req, res) => {
  try {

    const {firstName, lastName, email, password} = req.body

  } catch (e) {
    res.status(500).json({"message": "Something was wrong at sign up. Try again"})
  }
})


// //sign IN
// router.post('/signin', async (req, res) => {

// })

module.exports = router;