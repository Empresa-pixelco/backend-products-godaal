// // src/whatsapp/whatsapp.service.ts

// import { Injectable } from '@nestjs/common';
// import * as twilio from 'twilio';

// @Injectable()
// export class WhatsAppService {
//   private client;

//   constructor() {
//     // Inicializa Twilio con tus credenciales (recuerda reemplazar con las tuyas)
//     this.client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN'); // Reemplazar con las credenciales de Twilio
//   }

//   // Método para enviar el mensaje de WhatsApp
//   async sendMessage(to: string, message: string) {
//     try {
//       const messageSent = await this.client.messages.create({
//         body: message,
//         from: 'whatsapp:+14155238886', // Número de WhatsApp proporcionado por Twilio o tu propio número
//         to: `whatsapp:${to}`, // El número de la sucursal que recibirá el mensaje
//       });
//       return messageSent;
//     } catch (error) {
//       console.error('Error al enviar el mensaje:', error);
//       throw new Error('Error al enviar el mensaje por WhatsApp');
//     }
//   }
// }
