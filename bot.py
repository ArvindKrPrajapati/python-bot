import telebot



import json
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton



BOT_TOKEN = "6032128770:AAE6EkjAgWjGbXlOCFA8-wUU-6boHICo1tc"

bot = telebot.TeleBot(BOT_TOKEN)

def read_json(path):
    with open(path,'r') as f:
        data=json.load(f)
        return data 
    
data=read_json("./data/mp4mania.json")

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "hello , "+message.from_user.first_name+"! what do you wanna watch now ?")

@bot.message_handler(func=lambda message: True)
def echo_all(message):
    text=message.text
    markup = InlineKeyboardMarkup()
    for item in data:
        if text in item["Title"]:
            markup.add(InlineKeyboardButton(item["Title"], callback_data=item["id"]))
    bot.send_message(message.chat.id, 'Select an option:', reply_markup=markup)



@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    id=call.data
    
    movie = [d for d in data if d['id'] == int(id)][0]
    try:
        bot.send_video(call.message.chat.id,movie["url_one"])
        if "url_two" in movie:
            bot.send_video(call.message.chat.id,movie["url_two"])
            
    except Exception as e:
        print(e)
        url="https://res.cloudinary.com/shivraj-technology/video/upload/v1658042880/bvypefdlx6smjiwemqwb.mp4"
        bot.send_message(call.message.chat.id,movie["url_one"])
        if "url_two" in movie:
            bot.send_message(call.message.chat.id,movie["url_two"])
            
print("bot is running.....")
bot.polling()