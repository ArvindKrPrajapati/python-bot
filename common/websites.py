



import common
def dl11Sermovies(url):
  output=[]
  path="./data/dl11sermovies.json"
  soup=common.soup(url)
  i=0
  links=common.extractLink(soup,[0],url)
  print("movie found"+str(len(links)))
  for link in links:
    i+=1
    print("----loading: "+str(i))
    soup2=common.soup(link["href"])
    real_links=common.extractLink(soup2,[0],link["href"],link["text"])
    output+=real_links
  print(len(output))
  common.export_json(path,output)
  
  
def sermovies(url):
  output=[]
  path="./data/sermovies.json"
  soup=common.soup(url)
  i=0
  links=common.extractSermoviesLink(soup,[0,1],url)
  for link in links:
    i+=1
    print("----loading: "+str(i))
    soup2=common.soup(link["link"])
    real_links=common.extractSermoviesLink(soup2,[0,1],link["link"],link["text"])
    output+=real_links
  print(len(output))
  common.export_json(path,output)

def mp4mania(start=1,end=8938,append=False):
  skip=[0,4,5]
  path="./data/mp4mania.json"
  data=[]
  if append:
      data=common.read_json(path)
  for i in range(start,end+1):
    url = "https://hdmp4mania2.com/showmovie.php?id="+str(i)
    print("counter : ",i)
    soup = common.soup(url)
    info=common.extractInfo(soup,"description",skip,":",3,"https:")
    if info is None:
      print("movie not found")
      continue
    else:
      info["id"]=i
      name=info["Title"].replace(" ","%20")
      cat=info["Category"].replace(" ","%20")
      if int(info["Total_Part(s)"])>1:
        encoded_url_one="http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%201.mp4"
        encoded_url_two="http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%202.mp4"
        info["url_one"]=encoded_url_one
        info["url_two"]=encoded_url_two
      else:
        encoded_url="http://hd1.dlmania.com/"+cat+"/"+name+"/"+name+"%20HD%20(HDMp4Mania).mp4"
        info["url_one"]=encoded_url
      data.append(info)
      print(info["Title"])
  print("Exporting data to mp4mania.json in data folder...")
  common.export_json(path,data)
  print("done ✓")

