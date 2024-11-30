import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { FirebaseService } from '../firebase/firebase.service';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private readonly authService: AuthService,
      private readonly firebaseService: FirebaseService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('No authorization header provided');
      }
  
      const token = authHeader.split(' ')[1];
  
      try {
        // Step 1: Verify the token
        const decodedToken = await this.authService.verifyToken(token);
        const uid = decodedToken.uid;
  
        // Step 2: Fetch the user's role from Firestore
        const db = this.firebaseService.getFirestore();
        const roleDoc = await db.collection('userRoles').doc(uid).get();
  
        if (!roleDoc.exists) {
          throw new ForbiddenException('No role assigned to this user');
        }
  
        const role = roleDoc.data()?.role;
  
        // Step 3: Validate the role (example: only admins allowed)
        if (role !== 'admin') {
          throw new ForbiddenException('Access denied: insufficient permissions');
        }
  
        // Step 4: Attach user and role to the request
        request.user = {
          uid,
          role,
          ...decodedToken, // Pass additional user info from the token
        };
  
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }
  }