import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBUl2-_YM_2b_OCjm5-N37AAUNtTb2XUls",
  authDomain: "hr-management-system-f4fa3.firebaseapp.com",
  databaseURL: "https://hr-management-system-f4fa3.firebaseio.com",
  projectId: "hr-management-system-f4fa3",
  storageBucket: "hr-management-system-f4fa3.appspot.com",
  messagingSenderId: "833448238666"
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

   
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password,role) => {
    // console.log("create account");
    this.auth.createUserWithEmailAndPassword(email, password);
    this.auth.onAuthStateChanged(authUser =>{
      if(authUser){
          const data = {
            email: email,
            roles: {
              ADMIN: role
            }
          }
          
          this.user(authUser.uid).set(data).then(()=>{
            console.log("success");
          });
      }

      });
    // this.user(authUser.user.uid).set({
    //       // username,
    //       email,
    //       roles: {
    //         ADMIN: role
    //       },
    //     });
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);


  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //

  save = role => 
    this.auth.onAuthStateChanged(authUser =>{
      if(authUser){
          const data = {
            roles: {
              ADMIN: role
            }
          }
          
          this.user(authUser.uid).update(data).then(()=>{
            console.log("success");
          });
      }

      })
  
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            // console.log("on auth user");
            // default empty roles
            // console.log(dbUser);
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');


}

export default Firebase;
