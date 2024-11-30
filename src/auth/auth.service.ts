import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async verifyToken(token: string) {
    const auth = this.firebaseService.getAuth();
    return auth.verifyIdToken(token);
  }
}
