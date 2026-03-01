with open("extracted_ads_3.txt", "r") as f:
    text = f.read()
import re
cleaned = re.sub(r'\s+', ' ', text).strip()
with open("cleaned_ads_3.txt", "w") as f:
    f.write(cleaned)
