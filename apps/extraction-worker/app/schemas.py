from datetime import date
from decimal import Decimal
from pydantic import BaseModel


class ExtractedReceiptItem(BaseModel):
    raw_name: str
    normalized_name: str
    quantity: Decimal
    unit: str
    unit_price: Decimal
    line_total: Decimal
    confidence: Decimal
    requires_review: bool = False


class ExtractReceiptRequest(BaseModel):
    image_path: str


class ExtractReceiptResponse(BaseModel):
    merchant_name: str
    purchased_at: date
    receipt_total: Decimal
    items: list[ExtractedReceiptItem]
