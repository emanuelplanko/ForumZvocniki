import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  //konstruktor se bo avtomatsko povezal na jwt-preverja ali je vse legit glede jwt
  constructor(private jwtService: JwtService) {
  }

  //preverja legitimost jwt
  canActivate(
      context: ExecutionContext,
  ): any {

    //ta del je že narejen v user.controller
    try {
      //shranil sem si vse kar je browser poslal-sem zajel v ta request
      const request = context.switchToHttp().getRequest();
      //iz tega requesta lahko shranim samo jwt
      const jwt = request.cookies['jwt'];

      return this.jwtService.verify(jwt);
    }
    catch (e) {
      return false;
    }

  }
}




/*import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
*/