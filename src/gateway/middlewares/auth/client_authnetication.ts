import { NextFunction, Request, Response } from 'express';


interface RequestWithUserId extends Request {
  userId: string;
}

export const isClientAuthenticated = () => {
  return async function (req: RequestWithUserId, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const isAuthenticated = await validateClientAuth(req);
      
      if (isAuthenticated) {
        req.userId = isAuthenticated.userId;
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
};

async function validateClientAuth(req: Request): Promise<{isAuthenticated: boolean, userId: string}> {
  const authHeader = req.headers.authorization;

  
  
  if (!authHeader) {
    return {isAuthenticated: false, userId: ''};
  }

  return {isAuthenticated: true, userId: '123'};
}
