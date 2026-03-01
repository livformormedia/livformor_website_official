import PyPDF2
import sys

with open(sys.argv[1], 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for i in range(len(reader.pages)):
        text += reader.pages[i].extract_text() + '\n'
    
with open('extracted_ads.txt', 'w') as out:
    out.write(text)
