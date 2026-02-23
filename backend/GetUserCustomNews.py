from typing import List
import requests
from bs4 import BeautifulSoup
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import sys
import json
import os


# --- CONFIGURATION ---
SENDER_EMAIL = "hassenbensmy1@gmail.com"
SENDER_PASSWORD = "gykn pnqn ntla kqwu"
RECEIVER_EMAIL=""
Sites = list()
css = """
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0; direction: rtl; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #eeeeee; margin-bottom: 20px; }
        .header h1 { color: #0061af; margin: 0; font-size: 24px; }
        .intro { color: #555; font-size: 14px; margin-bottom: 25px; text-align: center; }
        
        /* ARTICLE CARD STYLE - List View */
        .article-card { 
            display: flex; 
            flex-direction: row; /* Image side-by-side with text */
            border-bottom: 1px solid #eee; 
            padding: 15px 0; 
            align-items: flex-start;
        }
        .article-card:last-child { border-bottom: none; }
        
        /* IMAGE STYLING - Small & Professional */
        .img-wrapper { 
            flex: 0 0 140px; /* Fixed width */
            margin-left: 15px; /* Spacing between img and text (RTL) */
        }
        img { 
            width: 140px; 
            height: 100px; 
            margin:5px;
            object-fit: cover; 
            border-radius: 4px; 
            display: block; 
        }
        
        /* TEXT STYLING */
        .content-wrapper { flex: 1; }
        h3 { margin: 0 0 8px 0; font-size: 16px; line-height: 1.4; }
        a { text-decoration: none; color: #222; font-weight: bold; }
        a:hover { color: #0061af; text-decoration: underline; }
        p { margin: 0; font-size: 13px; color: #666; line-height: 1.5; }
        
        .footer { text-align: center; font-size: 11px; color: #999; margin-top: 30px; }
    </style>
    """
html_content = f"""
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head><meta charset="utf-8"><title>Daily Brief</title>{css}</head>
    <body>
        <div class="container">
            <div class="header"><h1>طواري اليوم</h1></div>
            <div class="intro">(اضغط علي الرابط للمزيد من المعلمات) ذا لي خلك اليوم بختصار</div>
    """
count=0
if len(sys.argv) > 1:
        user_json_string = sys.argv[1]
        
try:
            # 2. Parse the JSON string into a Python dictionary
            current_user =json.loads(user_json_string)
            # {
            #         "email": "hassenntehah@gmail.com",
            #         "password": "1234",
            #         "preferences": {
            #         "categories": [
            #             "Technology",
            #             "Business",
            #             "Health"
            #         ],
            #         "customTopics": []
            #         }
            #     }
            RECEIVER_EMAIL = current_user.get("email")
            preferences = current_user.get("preferences", {})
            categories = preferences.get("categories", [])

            # Use absolute path
            script_dir = os.path.dirname(os.path.abspath(__file__))
            with open(os.path.join(script_dir, 'categories.json'), 'r') as file:
             availible_categories = json.load(file)
             for cate in availible_categories:
                if categories.__contains__(cate.get("categorie")):
                    for site in cate.get("scrappableSites"):
                         Sites.append(site)
            
               
except json.JSONDecodeError:
            print(json.dumps({"error": "Failed to parse user JSON"}))
else:
        print(json.dumps({"error": "No user data provided to script"}))

def ScrapNewsFromSite(website):
        # --- PRO STYLING (Email Safe) ---
   
    global html_content
    URL=website.get("url")


    try:
        response = requests.get(website.get("url"))
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = soup.find_all(website.get("tag"),attrs={"class":"" if website.get("class")=="" else website.get("class")})
        
        # --- DUPLICATE TRACKER ---
        seen_titles = set()
        global count
        
        
        for article in articles:
            
            # 1. Get Title for Duplicate Check
            headline = article.find('h3')
            if not headline: continue # Skip if no title
            
            title_text = headline.get_text(strip=True)
            
            # If we have seen this title before, SKIP IT
            if title_text in seen_titles:
                continue
            seen_titles.add(title_text)

            # 2. Extract Data (Clean Method)
            # Find Link
            link_tag = article.find('a')
            link = URL + link_tag['href'] if link_tag and link_tag['href'].startswith('/') else link_tag['href'] if link_tag else "#"
            
            # Find Image
            img_tag = article.find('img')
            img_src = ""
            if img_tag:
                # Prioritize src, clean it up
                if img_tag.get('src') and img_tag['src'].startswith('/'):
                    img_src = URL + img_tag['src']
                else:
                    img_src = img_tag.get('src', '')

            # Find Summary (Paragraph)
            p_tag = article.find('p')
            summary = p_tag.get_text(strip=True) if p_tag else ""

            # 3. Build Clean HTML manually (More reliable than string replace)
            # Only add if we have at least a title and image
            if title_text:
                html_content += f"""
                <div class="article-card">
                    <div class="img-wrapper">
                        <img src="{img_src}" alt="News Thumbnail" width="140" height="100">
                    </div>
                    <div class="content-wrapper">
                        <h3><a href="{link}">{title_text}</a></h3>
                        <p>{summary}</p>
                    </div>
                </div>
                """
                count += 1

    except Exception as e:
        print(f"Error scraping: {e}")
       
def close_html_and_SaveArtcile():
     global html_content
     global count
     html_content += "<p>Unable to fetch news at this moment.</p>"

     html_content += """
            <div class="footer">شطاري لديكم مافيتكم شي</div>
        </div>
    </body>
    </html>
    """
     print(html_content)
     # Save the file

     
     with open( os.path.join(os.path.dirname(os.path.abspath(__file__)), 'articles.html'), "w", encoding="utf-8") as file:
         file.write(html_content)
def SendMail():
    print("Sending email...")
    # Set the absolute path to the file
    file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'articles.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        email_body = f.read()

    msg = MIMEMultipart('alternative')
    msg['Subject'] = " سمعت الطواري"
    msg['From'] = SENDER_EMAIL
    msg['To'] = RECEIVER_EMAIL

    msg.attach(MIMEText("Please enable HTML to view this news brief.", 'plain'))
    msg.attach(MIMEText(email_body, 'html'))

    try:
        smtp = smtplib.SMTP('smtp.gmail.com', 587)
        smtp.ehlo()
        smtp.starttls()
        smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
        smtp.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
        smtp.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Email failed: {e}")

if __name__ == "__main__":
    print(f"sites: {Sites}")
    for site in Sites:
        ScrapNewsFromSite(site)
    
    close_html_and_SaveArtcile()
    SendMail()
