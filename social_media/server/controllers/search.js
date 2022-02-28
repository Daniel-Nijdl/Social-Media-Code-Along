const UserModel = require("../models/UserModel");

const searchUsers = async (req, res) => {
  let { searchText } = req.params;

  if (!searchText) return res.status(401).send("No searchText given");

  try {
    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.status(200).json(results);
  } catch (error) {
    console.log("Search Error @ Controllers/Search", error);
    res.status(500).send("Search Error @ Controllers/Search");
  }
};

module.exports = { searchUsers };
