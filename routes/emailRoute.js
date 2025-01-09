const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");

router.put("/api/email-update/:userId", async (req, res) => {
    const { userId } = req.params; 
    const { user_email } = req.body;
    try { 
        const result = await Pool.query( 
        `UPDATE users
        SET user_email = $1
        WHERE user_id = $2
        `,
       [user_email, userId])
        

        

        if (result.rows.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No logged in user"
          });
        }
    
        return res.status(200).json({
          success: true,
          data: result.rows,
          message: "Logged in user updated"
        });
    
      } catch (error) {
        console.error("Error updating users:", error);
        res.status(500).json({
          success: false,
          message: "Server error while updating user"
        });
      }
    });
    
    module.exports = router;