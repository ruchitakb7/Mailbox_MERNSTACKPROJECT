const Mail= require('../models/mail')
const User= require('../models/user')

exports.compose= async(req,res,next) =>
    {
       console.log('compose',req.user)
        try{
           
            const to=req.body.to;
            const subject=req.body.subject;
            const content=req.body.content;
    
                const mail= await Mail.create({
                to:to,
                subject:subject,
                content:content,
                userId:req.user.id})

                return res.status(201).json({ message: 'Mail sent successfully', mail });
            
        }catch (err) {
            console.error('Error composing mail:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
          }
    }
    

    exports.sentMail = async (req, res, next) => {
        try {

          const mails = await Mail.find({ userId: req.user.id });
          console.log(mails)
      
 
          if (!mails || mails.length === 0) {
            return res.status(404).json({ message: 'No data found' });
          }
      
      
          return res.status(200).json({ data: mails });
        } catch (error) {
      
          return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
      };
      