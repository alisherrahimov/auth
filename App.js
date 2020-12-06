import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
  webClientId:
    '3182350726-fi2lcmgtnlbgbo7vr03pdmontnje9n9j.apps.googleusercontent.com',
});
export default function App() {
  const [code, setCode] = useState('');
  async function GoogleSign() {
    try {
      const user = await GoogleSignin.signIn();
      console.log(user);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }
  async function Anonymous() {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }
  async function Logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  async function SignIngEmailAndPass() {
    auth()
      .createUserWithEmailAndPassword(
        'alisher.raximov97@gmail.com',
        'alisher2211!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <TextInput
        value={code}
        placeholder="code"
        placeholderTextColor="#fff"
        onChangeText={(text) => setCode(text)}
        style={{width: 200, height: 50, backgroundColor: '#842', color: '#fff'}}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          width: 200,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
        }}>
        <Text style={{color: '#fff'}}>Enter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          width: 200,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: '#fff'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
