package com.lumen.api.receipts.domain

import java.math.BigDecimal
import java.util.UUID

data class ReceiptItem(
    val id: UUID = UUID.randomUUID(),
    val rawName: String,
    val normalizedName: String,
    val quantity: BigDecimal,
    val unit: String,
    val unitPrice: BigDecimal,
    val lineTotal: BigDecimal,
    val confidence: BigDecimal,
    val requiresReview: Boolean = false
)
