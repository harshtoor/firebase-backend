import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
const serviceAccount = require('../../harshdeep-demo-62831-firebase-adminsdk-qexr6-8d55410547.json');

@Injectable()
export class FirebaseService {
  private firebaseAdmin;

  constructor() {
    this.firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  getAuth() {
    return this.firebaseAdmin.auth();
  }

  getFirestore() {
    return this.firebaseAdmin.firestore();
  }
}
