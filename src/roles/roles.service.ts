import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class RolesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async assignRole(uid: string, role: string) {
    const db = this.firebaseService.getFirestore();
    await db.collection('userRoles').doc(uid).set({ role });
  }

  async getRole(uid: string) {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('userRoles').doc(uid).get();
    return doc.exists ? doc.data()?.role : null;
  }
}