import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_NAME = os.environ.get("CODET5_MODEL_PATH", "codet5-small")

print(f"Loading model {MODEL_NAME}...")

tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    use_fast=False
)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
model.to("cuda" if torch.cuda.is_available() else "cpu")
print("OK: Model loaded successfully")

def repair_code(buggy_code):
    if not model or not tokenizer:
        return "Model not loaded. Fix the backend setup."

    inputs = tokenizer(
        buggy_code,
        return_tensors="pt",
        truncation=True,
        max_length=256
    ).to(model.device)

    outputs = model.generate(
        **inputs,
        max_length=256,
        num_beams=5,
        early_stopping=True
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)
