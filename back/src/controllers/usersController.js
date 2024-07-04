const { where } = require("sequelize");
const { User } = require("../db");

const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.findAll({})

        if(!allUser){
            res.status(404).send("No users founded")
        }

        res.status(200).json(allUser)
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const banUser = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
          }  
    
          const user = await User.findOne({ where: { email } });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        if(!user.isBanned){
            await User.update(
                {
                    isBanned: true
                },
                {
                  where: { email },
            }
        );
        return res.status(200).json({ message: "User Banned" });
        }else{
            await User.update(
                {
                    isBanned: false
                },
                {
                  where: { email },
            }
          );
        return res.status(200).json({ message: "User unbanned" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}

const setAdmin = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
          }  
    
          const user = await User.findOne({ where: { email } });
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        if(!user.isAdmin){
            await User.update(
                {
                    isAdmin: true
                },
                {
                  where: { email },
            }
        );
        return res.status(200).json({ message: "User admin" });
        }else{
            await User.update(
                {
                    isAdmin: false
                },
                {
                  where: { email },
            }
          );
        return res.status(200).json({ message: "User no admin" });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en la base de datos', error: error.message });
    }
}


module.exports = {
    getAllUsers,
    setAdmin,
    banUser
    };