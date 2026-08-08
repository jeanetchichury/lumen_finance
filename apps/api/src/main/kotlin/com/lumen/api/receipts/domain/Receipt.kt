package com.lumen.api.receipts.domain

import java.math.BigDecimal
import java.time.LocalDate
import java.time.OffsetDateTime
import java.util.UUID

data class Receipt(
    val id: UUID = UUID.randomUUID(),
    val merchantName: String,
    val purchasedAt: LocalDate,
    val totalAmount: BigDecimal,
    val imagePath: String,
    val source: String,
    val status: ReceiptStatus,
    val items: List<ReceiptItem> = emptyList(),
    val createdAt: OffsetDateTime = OffsetDateTime.now(),
    val updatedAt: OffsetDateTime = OffsetDateTime.now()
)
