import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const auth = getAuth(app)

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [user, setUser] = useState({})

  const handleSingInGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user)
        console.log(user);

      }).catch((error) => {
        console.log('error', error);
      });
  }
  const handleSingInGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);

      }).catch((error) => {
        console.error('error', error);
      });
  }

  

  const handleSingOutGoogle = () => {
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      setUser({})
    });
  }

  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSingOutGoogle}>Sing Out </button>
          :
          <>
           <button onClick={handleSingInGoogle}>Google Sing In </button>
           <button onClick={handleSingInGithub}>Github Sing In </button>
          </>

      }
      <p>{user.providerId}</p>
      <img src={user.photoURL} alt="" />
      <h3>Name : {user.displayName}</h3>
      <p>Email : {user.email ? user.email  : 'Email Nai Re Vai!!'}</p>
    </div>
  );
}

export default App;
