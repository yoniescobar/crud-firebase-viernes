
import { initializeApp } from "firebase/app";
import { get, getDatabase } from "firebase/database"; // esto es para la base de datos en tiempo real



function FirebaseConfig(){

    const firebaseConfig = {
        apiKey: "AIzaSyA3vWcHrZjhe_xnZ_mQGtyGPqakNWBNaDo",
        authDomain: "crud-colegio.firebaseapp.com",
        databaseURL: "https://crud-colegio-default-rtdb.firebaseio.com",
        projectId: "crud-colegio",
        storageBucket: "crud-colegio.appspot.com",
        messagingSenderId: "414626012197",
        appId: "1:414626012197:web:2730298ecaac900a38b3cc",
        measurementId: "G-CRSVSEE5DE"
      };

      const app = initializeApp(firebaseConfig);
      return  getDatabase(app);
}

export default FirebaseConfig;

