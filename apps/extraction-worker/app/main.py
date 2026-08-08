from datetime import date
from decimal import Decimal

from fastapi import FastAPI

from app.schemas import ExtractReceiptRequest, ExtractReceiptResponse, ExtractedReceiptItem

app = FastAPI(title="Lumen Extraction Worker", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/extract", response_model=ExtractReceiptResponse)
def extract_receipt(_: ExtractReceiptRequest) -> ExtractReceiptResponse:
    return ExtractReceiptResponse(
        merchant_name="Mercado Central",
        purchased_at=date(2026, 7, 23),
        receipt_total=Decimal("78.60"),
        items=[
            ExtractedReceiptItem(
                raw_name="ARROZ 1KG",
                normalized_name="Rice",
                quantity=Decimal("1.000"),
                unit="kg",
                unit_price=Decimal("8.90"),
                line_total=Decimal("8.90"),
                confidence=Decimal("0.98"),
            ),
            ExtractedReceiptItem(
                raw_name="BANANA D AGUA 0.566KG",
                normalized_name="Banana d'agua",
                quantity=Decimal("0.566"),
                unit="kg",
                unit_price=Decimal("7.99"),
                line_total=Decimal("4.52"),
                confidence=Decimal("0.71"),
                requires_review=True,
            ),
        ],
    )
