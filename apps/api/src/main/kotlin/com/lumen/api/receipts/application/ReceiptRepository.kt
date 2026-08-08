package com.lumen.api.receipts.application

import com.lumen.api.receipts.domain.Receipt
import java.util.UUID

interface ReceiptRepository {
    fun save(receipt: Receipt): Receipt
    fun findById(id: UUID): Receipt?
    fun findAll(): List<Receipt>
}
