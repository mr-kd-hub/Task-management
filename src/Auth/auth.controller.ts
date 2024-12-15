import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(
    @Res() res: any,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('avatarUrl') avatarUrl?: string,
  ) {
    try {
      await this.authService.signUp(email, password, avatarUrl);
      return res.status(200).send({
        message: 'User sign-up successfully'
      });
    } catch (err:any) {
      console.log(err)
      return res.status(500).send({
        message: 'Error sign-up user'
      });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res() res: any,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const token = await this.authService.signIn(email, password);
      return res.status(200).send({
        token: token?.access_token
      });
    } catch (err:any) {
      console.log(err)
      return res.status(500).send({
        message: 'Error Sign-in user'
      });
    }
  }
}
