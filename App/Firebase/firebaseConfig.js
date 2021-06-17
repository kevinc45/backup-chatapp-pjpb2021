import Firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDkOMfhfOJ5z3ca3ZFibJPJ97Lpgs42KKE",
    databaseURL: "https://mychat-9694d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mychat-9694d",
    appId: "1:579159043486:web:94f9e3d2e33acabc8aba8f",
};

export default Firebase.initializeApp(firebaseConfig);