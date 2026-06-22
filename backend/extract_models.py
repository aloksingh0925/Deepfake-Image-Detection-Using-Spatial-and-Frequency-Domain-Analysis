import json
import sys

# Read the notebook with UTF-8 encoding
with open(r'C:\Users\shyam\Downloads\multiAlgoTrain.ipynb', 'r', encoding='utf-8') as f:
    notebook = json.load(f)

# Extract code cells with model definitions
with open('extracted_models.txt', 'w', encoding='utf-8') as out:
    for i, cell in enumerate(notebook['cells']):
        if cell['cell_type'] == 'code':
            source = ''.join(cell['source'])
            if any(keyword in source for keyword in ['class Meso4', 'class XceptionDetector', 'class EfficientNetDetector', 'class FrequencyDetector', 'class MesoInception4']):
                out.write(f"{'='*80}\n")
                out.write(f"CELL {i}\n")
                out.write(f"{'='*80}\n")
                out.write(source)
                out.write("\n\n")

print("✅ Models extracted to extracted_models.txt")
