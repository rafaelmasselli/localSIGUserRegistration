export function emailHtml(verificationCode: string) {
  return `
     <!DOCTYPE html>
     <html>
       <head>
         <style>
           body {
             font-family: Arial, sans-serif;
           }
           .container {
             width: 80%;
             margin: auto;
             padding: 20px;
             border: 1px solid #ddd;
             border-radius: 5px;
             flex-direction: column;
             display: flex;
           }
           .content {
             justify-content: center;
             display: flex;
             align-items: center;
             flex-direction: column;
           }
           .text__content {
             line-height: 1.6;
           }
           .verification-code {
             background-color: #f8f8f8;
             padding: 5px;
             border-radius: 5px;
           }
         </style>
       </head>
       <body>
         <div class="container">
           <div class="content">
             <p class="text__content">Olá,</p>
             <p class="text__content">
               Seu código de verificação é:
               <span class="verification-code"
                 ><strong>${verificationCode}</strong></span
               >
             </p>
           </div>
         </div>
       </body>
     </html>
     
    `;
}
