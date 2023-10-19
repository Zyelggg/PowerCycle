css = '''
<style>
.chat-message {
    padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1rem; display: flex
}
.chat-message.user {
    background-color: #2b313e
}
.chat-message.bot {
    background-color: #475063
}
.chat-message .avatar {
  width: 20%;
}
.chat-message .avatar img {
  max-width: 78px;
  max-height: 78px;
  border-radius: 50%;
  object-fit: cover;
}
.chat-message .message {
  width: 80%;
  padding: 0 1.5rem;
  color: #fff;
}
.stApp {
        background-color: #250D69 !important;
    }
.css-18ni7ap {
    background-color: #250D69 !important;
}
.css-10trblm{
color: white
}
.css-16idsys{
color:white
}
'''

bot_template = '''
<div class="chat-message bot">
    <div class="avatar">
        <img src="http://localhost:3000/src/pages/images/powerlogo.png" style="max-height: 78px; max-width: 78px; border-radius: 50%; object-fit: cover;">
    </div>
    <div class="message">{{MSG}}</div>
</div>
'''

user_template = '''
<div class="chat-message user">
    <div class="avatar">
        <img src="https://localhost:3001/public/uploads/defaultpfp.png">
    </div>    
    <div class="message">{{MSG}}</div>
</div>
'''
