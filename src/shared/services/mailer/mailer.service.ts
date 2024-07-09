import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    name: 'ethereal.email',
    host: this.configService.get<string>('NODEMAILER_HOST'),
    port: this.configService.get<number>('NODEMAILER_PORT'),
    auth: {
      user: this.configService.get<string>('NODEMAILER_USER'),
      pass: this.configService.get<string>('NODEMAILER_PASS'),
    },
  });
  private readonly logger = new Logger(MailerService.name);

  constructor(private readonly configService: ConfigService) {}

  public sendEmail(mailOptions: Mail.Options) {
    this.logger.log(mailOptions.to, 'ATTEMPTING TO SEND EMAIL!: ');
    this.transporter.sendMail(mailOptions, (err, info) =>
      err ? this.logger.log(err) : this.logger.log(info),
    );
  }
}
