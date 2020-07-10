const express = require("express");
const router = express.Router();

const Blog = require("../models/blog");

router.get("/", (req, res) => {
  Blog.find({})
    .then((result) =>
      res.status(200).json({ message: "Detail display", list: result })
    )
    .catch((err) => {
      res.status(400).json({ message: "Error", list: "" });
    });
});

router.post("/add", (req, res) => {
  const data = req.body;
  const blog = new Blog(data);
  blog.save((err) => {
    if (err) return res.status(400).json({ message: "Error saving" });
    return res.status(200).json({ message: "Saved" });
  });
});

router.delete("/delete/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((data) =>
      data.remove().then(() => res.json({ message: "deleted", list: data }))
    )
    .catch((err) => res.json({ message: "Error deleting" }));
});

router.put("/edit/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((data) => {
      data.title = req.body.title;
      data.body = req.body.body;

      data
        .save()
        .then(() => res.json("updated"))
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((data) => {
      res.json({ status: 200, list: data });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: 400, message: "Error" });
    });
});


module.exports = router;
