package com.lumen.api.receipts.domain

enum class ReceiptStatus {
    UPLOADED,
    PROCESSING,
    PENDING_REVIEW,
    CONFIRMED,
    FAILED
}
