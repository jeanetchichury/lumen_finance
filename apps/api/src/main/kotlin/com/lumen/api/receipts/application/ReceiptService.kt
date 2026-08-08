package com.lumen.api.receipts.application

import com.lumen.api.receipts.domain.Receipt
import com.lumen.api.receipts.domain.ReceiptItem
import com.lumen.api.receipts.domain.ReceiptStatus
import org.springframework.stereotype.Service
import java.math.BigDecimal
import java.time.LocalDate
import java.time.OffsetDateTime
import java.util.UUID

@Service
class ReceiptService(
    private val receiptRepository: ReceiptRepository
) {
    fun createReceipt(command: CreateReceiptCommand): Receipt {
        val receipt = Receipt(
            merchantName = command.merchantName,
            purchasedAt = command.purchasedAt,
            totalAmount = command.totalAmount,
            imagePath = command.imagePath,
            source = command.source,
            status = ReceiptStatus.UPLOADED
        )
        return receiptRepository.save(receipt)
    }

    fun startProcessing(receiptId: UUID): Receipt {
        val current = requireReceipt(receiptId)
        return receiptRepository.save(current.copy(status = ReceiptStatus.PROCESSING, updatedAt = OffsetDateTime.now()))
    }

    fun completeProcessing(receiptId: UUID): Receipt {
        val current = requireReceipt(receiptId)
        val items = listOf(
            ReceiptItem(
                rawName = "ARROZ 1KG",
                normalizedName = "Rice",
                quantity = BigDecimal("1.00"),
                unit = "kg",
                unitPrice = BigDecimal("8.90"),
                lineTotal = BigDecimal("8.90"),
                confidence = BigDecimal("0.98")
            ),
            ReceiptItem(
                rawName = "BANANA D AGUA 0.566KG",
                normalizedName = "Banana d'agua",
                quantity = BigDecimal("0.566"),
                unit = "kg",
                unitPrice = BigDecimal("7.99"),
                lineTotal = BigDecimal("4.52"),
                confidence = BigDecimal("0.71"),
                requiresReview = true
            )
        )
        return receiptRepository.save(
            current.copy(
                status = ReceiptStatus.PENDING_REVIEW,
                items = items,
                updatedAt = OffsetDateTime.now()
            )
        )
    }

    fun reviewReceipt(receiptId: UUID, command: ReviewReceiptCommand): Receipt {
        val current = requireReceipt(receiptId)
        return receiptRepository.save(
            current.copy(
                merchantName = command.merchantName,
                purchasedAt = command.purchasedAt,
                totalAmount = command.totalAmount,
                items = command.items.map {
                    ReceiptItem(
                        id = it.id ?: UUID.randomUUID(),
                        rawName = it.rawName,
                        normalizedName = it.normalizedName,
                        quantity = it.quantity,
                        unit = it.unit,
                        unitPrice = it.unitPrice,
                        lineTotal = it.lineTotal,
                        confidence = it.confidence,
                        requiresReview = it.requiresReview
                    )
                },
                updatedAt = OffsetDateTime.now()
            )
        )
    }

    fun confirmReceipt(receiptId: UUID): Receipt {
        val current = requireReceipt(receiptId)
        require(current.status == ReceiptStatus.PENDING_REVIEW) {
            "Only receipts pending review can be confirmed."
        }
        return receiptRepository.save(current.copy(status = ReceiptStatus.CONFIRMED, updatedAt = OffsetDateTime.now()))
    }

    fun getReceipt(receiptId: UUID): Receipt = requireReceipt(receiptId)

    fun recentReceipts(): List<Receipt> = receiptRepository.findAll().sortedByDescending { it.createdAt }

    fun monthlyBudgetSummary(referenceDate: LocalDate): MonthlyBudgetSummary {
        val confirmedReceipts = receiptRepository.findAll()
            .filter { it.status == ReceiptStatus.CONFIRMED }
            .filter { it.purchasedAt.year == referenceDate.year && it.purchasedAt.month == referenceDate.month }

        val totalSpent = confirmedReceipts.fold(BigDecimal.ZERO) { acc, receipt -> acc + receipt.totalAmount }

        return MonthlyBudgetSummary(
            referenceMonth = "${referenceDate.year}-${referenceDate.monthValue.toString().padStart(2, '0')}",
            totalSpent = totalSpent,
            budgetLimit = BigDecimal("4000.00"),
            categories = listOf(
                BudgetCategorySummary("Market", BigDecimal("986.40")),
                BudgetCategorySummary("Pharmacy", BigDecimal("210.50")),
                BudgetCategorySummary("Recurring Bills", BigDecimal("645.00")),
                BudgetCategorySummary("Superfluous", BigDecimal("98.30"))
            )
        )
    }

    private fun requireReceipt(receiptId: UUID): Receipt {
        return requireNotNull(receiptRepository.findById(receiptId)) {
            "Receipt $receiptId was not found."
        }
    }
}

data class CreateReceiptCommand(
    val merchantName: String,
    val purchasedAt: LocalDate,
    val totalAmount: BigDecimal,
    val imagePath: String,
    val source: String
)

data class ReviewReceiptCommand(
    val merchantName: String,
    val purchasedAt: LocalDate,
    val totalAmount: BigDecimal,
    val items: List<ReviewReceiptItemCommand>
)

data class ReviewReceiptItemCommand(
    val id: UUID?,
    val rawName: String,
    val normalizedName: String,
    val quantity: BigDecimal,
    val unit: String,
    val unitPrice: BigDecimal,
    val lineTotal: BigDecimal,
    val confidence: BigDecimal,
    val requiresReview: Boolean
)

data class MonthlyBudgetSummary(
    val referenceMonth: String,
    val totalSpent: BigDecimal,
    val budgetLimit: BigDecimal,
    val categories: List<BudgetCategorySummary>
)

data class BudgetCategorySummary(
    val name: String,
    val total: BigDecimal
)
