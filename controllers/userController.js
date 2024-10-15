const router = require("express").Router();
const { User } = require("../models");


// get /users/
router.get("/", async (req, res) => {
  console.log("GET /users/ route hit");
  const allUsers = await User.findAll();
});

// get /users/:id
router.get("/:id", async (req, res) => {
  console.log("GET /users/:id route hit");
  const user = await User.findByPk(req.params.id);
});

// post /users/
router.post("/", async (req, res) => {
  console.log("POST /users/ route hit");
  const newUser = await User.create(req.body);
});

// put /users/:id
router.put("/:id", async (req, res) => {
  console.log("PUT /users/:id route hit");
  const updatedUser = await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
});

// delete /users/:id
router.delete("/:id", async (req, res) => {
  console.log("DELETE /users/:id route hit");
  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
});

// login user
router.post("/login", async (req, res) => {
  console.log("POST /users/login route hit");
  const user
    = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
  if (!user) {
    res.status(400).json({ message: "User not found" });
    return;
  }
  const validPassword = await user.checkPassword(req.body.password);
  if (!validPassword) {
    res.status(400).json({ message: "Password is wrong" });
    return;
  }
  req.session.save(() => {
    req.session.user_id = user.id;
    req.session.logged_in = true;
    res.json({ user: user, message: "You are now logged in!" });
  });
}
);

// logout user
router.post("/logout", async (req, res) => {
  console.log("POST /users/logout route hit");
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// signup user
router.post("/signup", async (req, res) => {
  console.log("POST /users/signup route hit");
  const newUser = await User.create(req.body);
  req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    res.json({ user: newUser, message: "You are now signed up and logged in!" });
  });
});

module.exports = router;
