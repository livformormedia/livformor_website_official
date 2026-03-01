with open("extracted_ads.txt", "r") as f:
    text = f.read()

# Replace newlines with spaces and condense multiple spaces
import re
cleaned = re.sub(r'\s+', ' ', text).strip()

with open("cleaned_ads.txt", "w") as f:
    f.write(cleaned)
