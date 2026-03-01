import PyPDF2
import sys

with open(sys.argv[1], 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for i in range(len(reader.pages)):
        text += reader.pages[i].extract_text()
    print(text[:2000])
