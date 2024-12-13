import { verificationEmailTemplate } from "../lib/email_template.js";
import { transporter } from "../config/email.config.js";
import { savedPropertyUpdateTemplate } from "../lib/update_email.js";

 

export const sendVerificationCode=async(email, verificationCode)=>{
    try {
        console.log(verificationCode, "jo actual code h");
        const emailContent = verificationEmailTemplate.replace(`codetobeReplace`, verificationCode);
        console.log(emailContent); // Check if the placeholder is replaced correctly
        
        const response = await transporter.sendMail({
            from: '"Estate Edge " <gunjan251492@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Your verification code is ${verificationCode}`, // plain text body
            html: emailContent // html body
        });
        console.log(`Email sent successfully`);
    } catch (error) {
        console.log(error); 
        throw new Error("Failed to send verification email");
    }
}

export const sendUpdateMail = async (email, listing) => {
    try {
        const propertyLink = `http://localhost:5173/listing/${listing._id}`;
        console.log(email, "update m bhejne ke liye jo mail aayi h ");
      const emailContent = savedPropertyUpdateTemplate.replace('{{listingName}}', listing.name).replace('{{propertyLink}}', propertyLink);;
  
      await transporter.sendMail({
        from: '"Estate Edge" <gunjan251492@gmail.com>',
        to: email,
        subject: "Check Out What's New with Your Saved Property!",
        text: `Update Alert: The property "${listing.name}" that you saved has been updated. Visit now to see the latest changes.`,
        html: emailContent
      });
  
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  };