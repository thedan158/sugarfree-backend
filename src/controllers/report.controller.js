import admin from "firebase-admin";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app();
}
const db = admin.firestore();

export const ReportController = {
  //*Save today sugar level
  saveTodaySugarLevel: async (req, res) => {
    try {
      const { username, sugarLevel } = req.body;
      console.log(username, sugarLevel);
      var today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = String(today.getFullYear());
      console.log(dd, mm, yyyy);
      today = yyyy + "-" + mm + "-" + dd;
      console.log(today);
      const user = await db.collection("Users").doc(username).get();
      if (!user) {
        res.status(501).json({
          success: false,
          message: "User not found",
        });
      } else {
        await db
          .collection("Users")
          .doc(username)
          .collection("Reports")
          .doc(today)
          .set(
            {
              sugarLevel: sugarLevel,
              date: dd + "/" + mm + "/" + yyyy,
            },
            { merge: true }
          );
        res.status(200).json({
          success: true,
          message: "Sugar level saved",
          sugarLevel: sugarLevel,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  //*End Region

  //*Region save today BMI
  saveTodayBMI: async (req, res) => {
    try {
      const { username, BMI } = req.body;
      var today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = String(today.getFullYear());
      console.log(dd, mm, yyyy);
      today = yyyy + "-" + mm + "-" + dd;
      console.log(today);
      const user = await db.collection("Users").doc(username).get();
      if (!user) {
        res.status(501).json({
          success: false,
          message: "User not found",
        });
      } else {
        await db
          .collection("Users")
          .doc(username)
          .collection("Reports")
          .doc(today)
          .set(
            {
              BMI: BMI,
              date: dd + "/" + mm + "/" + yyyy,
            },
            { merge: true }
          );
        res.status(200).json({
          success: true,
          message: "BMI saved",
          BMI: BMI,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
  //*End Region

  //*Region Get today sugar level
  getTodayReport: async (req, res) => {
    try {
      const { username } = req.body;
      console.log(username);
      var today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = String(today.getFullYear());
      console.log(dd, mm, yyyy);
      today = yyyy + "-" + mm + "-" + dd;
      console.log(today);
      const user = await db.collection("Users").doc(username).get();
      if (!user) {
        res.status(501).json({
          success: false,
          message: "User not found",
        });
      } else {
        const snapshot = await db
          .collection("Users")
          .doc(username)
          .collection("Reports")
          .doc(today)
          .get();
        res.status(200).json({
          success: true,
          message: snapshot.data(),
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },
    //*End Region

    //*Region Get all report
    getAllReport: async (req, res) => {
      try {
        const { username } = req.body;
        console.log(username);
        const user = await db.collection("Users").doc(username).get();
        if (!user) {
          res.status(501).json({
            success: false,
            message: "User not found",
          });
        } else {
          const snapshot = await db
            .collection("Users")
            .doc(username)
            .collection("Reports")
            .get();
          res.status(200).json({
            success: true,
            message: snapshot.docs.map((doc) => doc.data()),
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error,
        });
      }
    },
};
