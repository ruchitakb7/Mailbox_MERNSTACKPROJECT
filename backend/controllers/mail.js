const Mail= require('../models/mail')
const User= require('../models/user')
const Recipient = require('../models/reciept');
//const io = require('socket.io')(server);


function extractPlainText(editorContent) {
   const parsedContent = JSON.parse(editorContent);

  return parsedContent.blocks.map(block => block.text);
}

exports.compose = async (req, res, next) => {
  console.log('compose', req.user);
  try {
    const { to, subject, content } = req.body;

    const mail = await Mail.create({
      senderId: req.user.id, 
      subject: subject,
      content: content,
    });
    
    const recipient = await User.findOne({ email: to });

    if (recipient) {
      await Recipient.create({
        emailId: mail._id, 
        recipientId: recipient._id, 
      });
      io.emit('new-mail', {receiverId: recipient._id });
      //io.to(recipient._id.toString()).emit('new-mail',{receiverId: recipient._id});
      
    } 
    else
    {
      console.log('Recipient does not exist in the database.');
    }

    return res.status(201).json({ message: 'Mail sent successfully'});
  } catch (err) {
    console.error('Error composing mail:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.sentMail = async (req, res, next) => {
  try {
   
    const mails = await Mail.find({ senderId: req.user.id, isDeleted: false });

    if (!mails || mails.length === 0) {
      return res.status(404).json({ message: 'No sent mails found' });
    }

    const enhancedMails = await Promise.all(
      mails.map(async (mail) => {
   
        const recipientData = await Recipient.findOne({ emailId: mail._id }).populate('recipientId', 'email');

        return {
          id:mail._id,
          to: recipientData?.recipientId?.email , 
          date: mail.createdAt,
          subject: mail.subject,
          content: extractPlainText(mail.content),
        };
      })
    );

    return res.status(200).json({ data: enhancedMails });
  } catch (error) {
    console.error('Error fetching sent mails:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};    


exports.fetchInbox = async (req, res, next) => {
  try {
    const messages = await Recipient.find({ recipientId: req.user.id,isDeleted:false })
    .populate({
      path: 'emailId', 
      select: 'senderId subject content date',
      populate: { path: 'senderId', model: 'User', select: 'email' }
    });
  
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }

    const enhancedMails = messages.map(mail => ({
  id: mail._id,
  from: mail.emailId?.senderId?.email || 'Unknown', 
  date: mail.emailId?.date || mail.createdAt, 
  subject: mail.emailId?.subject || '', 
  content: extractPlainText(mail.emailId?.content),
  isSeen: mail.isSeen ,
  isDeleted: mail.isDeleted 
    }));
    

    res.status(200).json(enhancedMails);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


exports.deletebysender=async(req,res,next)=>{
  try{
      const {id}=req.params;
      const response= await Mail.findByIdAndUpdate(id,{$set:{isDeleted:true}},{new:true})

      if(!response)
      {
          return res.status(404).json({ message: 'Mail not found' })
      }
      return res.status(200).json({message:"Mail successfully deleted"})
  }
  catch(error){
    return res.status(500).json({ error: error.message });
  }
}


exports.deletefrominbox=async(req,res,next)=>{
  try{
    const {id}=req.params;
    const response= await Recipient.findByIdAndUpdate(id,{$set:{isDeleted:true}},{new:true})
    console.log('delete',response)

    if(!response)
    {
        return res.status(404).json({ message: 'Mail not found' })
    }
    return res.status(200).json({message:"Mail successfully deleted"})
}
catch(error){
  return res.status(500).json({ error: error.message });
}
}


exports.markasSeen=async(req,res,next)=>{
  try{
    const {id} = req.params
    const response=await Recipient.findByIdAndUpdate(id,{$set:{isSeen:true}},{new:true})
    //console.log(response)
    return res.status(200).json({message:'done'})
  }
  catch(error)
  {
    res.status(500).json({error})
  }
}
