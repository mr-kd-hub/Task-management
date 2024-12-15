import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auth, AuthDocument } from "./auth.model";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService { 
    constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>, private jwtService: JwtService) { }

    async signUp(email: string, password: string, avatarUrl?: string){
        const hashedPassword = await bcrypt.hash(password, 10); //HAsh password befor store
        const auth = new this.authModel({ email, password: hashedPassword, avatarUrl });
        return auth.save();
    }

    async signIn(email: string, password: string){
        const auth = await this.authModel.findOne({ email });
        if (auth && (await auth.validatePassword(password))) {
          const payload = { email: auth.email, sub: auth._id };
          return { access_token: this.jwtService.sign(payload) }; //sign tokrn with auth_id and email
        }
        throw new Error('Invalid credentials');
    }
}