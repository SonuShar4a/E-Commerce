const { User } = require("../model/User")


exports.createUser = async (req, res) => {

    //     console.log("Sonu");
    const user = new User(req.body);
    try {
        const doc = await user.save();
        res.status(200).json({ id: doc.id, role: doc.role });
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.loginUser = async (req, res) => {
     res.json({status:"send"})
};