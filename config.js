import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCJq4dn2wEPgz6JYsUzp-ZNWAjKHDeRWSg",
  authDomain: "attendence-app-f16ef.firebaseapp.com",
  databaseURL: "https://attendence-app-f16ef-default-rtdb.firebaseio.com",
  projectId: "attendence-app-f16ef",
  storageBucket: "attendence-app-f16ef.appspot.com",
  messagingSenderId: "290278770690",
  appId: "1:290278770690:web:472eddb4833cf74094ff1b"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default  firebase.database();