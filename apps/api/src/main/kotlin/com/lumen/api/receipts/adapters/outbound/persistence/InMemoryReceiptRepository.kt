package com.lumen.api.receipts.adapters.outbound.persistence

import com.lumen.api.receipts.application.ReceiptRepository
import com.lumen.api.receipts.domain.Receipt
import org.springframework.stereotype.Repository
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

@Repository
class InMemoryReceiptRepository : ReceiptRepository {
    private val storage = ConcurrentHashMap<UUID, Receipt>()

    override fun save(receipt: Receipt): Receipt {
        storage[receipt.id] = receipt
        return receipt
    }

    override fun findById(id: UUID): Receipt? = storage[id]

    override fun findAll(): List<Receipt> = storage.values.toList()
}
