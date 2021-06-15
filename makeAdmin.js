var admin = require("firebase-admin");


// Put Your service Account Information Here --> Go to Firebase and 
//  create  service account then Copy paste info here...

// copy paste here
var serviceAccount = {

}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://db-url.firebaseio.com"
});

// PUt your Email Address to make admin Account ...
let admin_email='email@gmail.com'

admin.auth().getUserByEmail(admin_email).then(user=>{
    console.log(user)
    admin.auth().setCustomUserClaims(user.uid,{
        admin:true
    })
})