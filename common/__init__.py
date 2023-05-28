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
   

def extractLink(soup,skip,url="",name=""):
  links=[]
  for i,link in enumerate(soup.find_all("a")):
    if(i in skip):
      continue
    link_dict={}
    if name!="":
      link_dict["name"]=name
      
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
    
    
def extractSermoviesLink(soup,skip_array=[],url="",name=""):
    data = []

    rows = soup.find_all('tr')
    for i, row in enumerate(rows):
        if i in skip_array:
            continue

        td_elements = row.find_all('td')

        row_data = {}
        if name!="":
          row_data["name"]=name
        for td in td_elements:
            class_name = td.get('class')
            if class_name is not None:
                class_name = ' '.join(class_name)

            if url != "":
                a_tag = td.find('a')
                if a_tag:
                    href = a_tag.get('href')
                    if href:
                        href = url + href
                        text = a_tag.get_text(strip=True)
                        row_data['text'] = text

            text = td.get_text(strip=True)
            if class_name:
                row_data[class_name] = text
            else:
                row_data['value'] = text

            if url != "" and href:
                row_data['link'] = href

        data.append(row_data)

    return data
