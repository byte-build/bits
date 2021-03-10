import firebase from 'firebase-admin'

if (!firebase.apps.length)
	firebase.initializeApp({
		credential: firebase.credential.cert(
			JSON.parse(
				Buffer.from(
					process.env.FIREBASE_ADMIN_KEY as string,
					'base64'
				).toString()
			)
		),
		storageBucket: 'byte-build.appspot.com'
	})

export default firebase
