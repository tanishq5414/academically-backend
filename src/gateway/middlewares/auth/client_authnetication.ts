import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../../services/auth';
import { AuthHydrator } from '../../../services/auth/hydrator';


export const isClientAuthenticated = async (req: any, res: any, next: any): Promise<any> => {
  try {
    const authResult = await validateClientAuth(req);
    
    if (authResult.isAuthenticated) {
      req.userId = authResult.userId;
      return next();
    }

    return res.status(401).json({
      error: 'Authentication failed', 
      message: 'Invalid or missing authentication credentials'
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(401).json({
      error: 'Authentication failed',
      details: errorMessage
    });
  }
};

async function validateClientAuth(req: Request): Promise<{isAuthenticated: boolean, userId: string}> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return {isAuthenticated: false, userId: ''};
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return {isAuthenticated: false, userId: ''};
  }

  const decodedToken = AuthHydrator.verifyToken(token);
  if (!decodedToken) {
    return {isAuthenticated: false, userId: ''};
  }
  return {isAuthenticated: true, userId: decodedToken.userId};
}
