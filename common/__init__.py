import requests
from bs4 import BeautifulSoup
import json

def soup(url):
  headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
  print("---------loading-----------")
  try:
    response=requests.get(url,headers=headers)
    soup = BeautifulSoup(response.content,'html.parser')
    return soup
  except Exception as e:
    return e
   

def extractLink(soup,skip,url=""):
  links=[]
  for i,link in enumerate(soup.find_all("a")):
    if(i in skip):
      continue
    link_dict={}
    link_dict["text"]=link.text.strip()
    href=link.get("href")
    if url:
      href=url+href
    link_dict["href"]=href
    links.append(link_dict)
  return links
  
  
def extractInfo(soup,class_name,skip,seprator=":",img_index=-1,img_url=""):
  try:
    info_dict={}
    description=soup.find_all(class_=class_name)
    img=""
    if img_index>=0:
      img=soup.find_all("img")[img_index]["src"]
    for i,desc in enumerate(description):
      if i in skip:
        continue
      desc_arr=desc.text.split(seprator)
      info_dict["img"]=img_url+img
      info_dict[desc_arr[0].strip().replace(" ","_")]=desc_arr[1].strip()
    return info_dict
  except IndexError:
    return None
  

def export_json(file_nane,data):
  with open(file_nane,"w") as f:
    json.dump(data,f)
 
def read_json(file_nane):
  with open(file_nane,"r") as f:
    data=json.load(f)
    return data