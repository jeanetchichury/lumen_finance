package com.lumen.api.receipts.adapters.inbound.http

import com.lumen.api.receipts.application.BudgetCategorySummary
import com.lumen.api.receipts.application.CreateReceiptCommand
import com.lumen.api.receipts.application.MonthlyBudgetSummary
import com.lumen.api.receipts.application.ReceiptService
import com.lumen.api.receipts.application.ReviewReceiptCommand
import com.lumen.api.receipts.application.ReviewReceiptItemCommand
import com.lumen.api.receipts.domain.Receipt
import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.math.BigDecimal
import java.time.LocalDate
import java.util.UUID

@RestController
@RequestMapping("/api")
class ReceiptController(
    private val receiptService: ReceiptService
) {
    @PostMapping("/receipts")
    fun createReceipt(@Valid @RequestBody request: CreateReceiptRequest): ReceiptResponse {
        val receipt = receiptService.createReceipt(
            CreateReceiptCommand(
                merchantName = request.merchantName,
                purchasedAt = request.purchasedAt,
                totalAmount = request.totalAmount,
                imagePath = request.imagePath,
                source = request.source
            )
        )
        return receipt.toResponse()
    }

    @PostMapping("/receipts/{receiptId}/process")
    fun processReceipt(@PathVariable receiptId: UUID): ReceiptResponse {
        receiptService.startProcessing(receiptId)
        return receiptService.completeProcessing(receiptId).toResponse()
    }

    @GetMapping("/receipts/{receiptId}")
    fun getReceipt(@PathVariable receiptId: UUID): ReceiptResponse =
        receiptService.getReceipt(receiptId).toResponse()

    @PutMapping("/receipts/{receiptId}/review")
    fun reviewReceipt(
        @PathVariable receiptId: UUID,
        @Valid @RequestBody request: ReviewReceiptRequest
    ): ReceiptResponse {
        val receipt = receiptService.reviewReceipt(
            receiptId,
            ReviewReceiptCommand(
                merchantName = request.merchantName,
                purchasedAt = request.purchasedAt,
                totalAmount = request.totalAmount,
                items = request.items.map {
                    ReviewReceiptItemCommand(
                        id = it.id,
                        rawName = it.rawName,
                        normalizedName = it.normalizedName,
                        quantity = it.quantity,
                        unit = it.unit,
                        unitPrice = it.unitPrice,
                        lineTotal = it.lineTotal,
                        confidence = it.confidence,
                        requiresReview = it.requiresReview
                    )
                }
            )
        )
        return receipt.toResponse()
    }

    @PostMapping("/receipts/{receiptId}/confirm")
    fun confirmReceipt(@PathVariable receiptId: UUID): ReceiptResponse =
        receiptService.confirmReceipt(receiptId).toResponse()

    @GetMapping("/receipts/recent")
    fun recentReceipts(): List<ReceiptResponse> =
        receiptService.recentReceipts().map { it.toResponse() }

    @GetMapping("/budget/monthly-summary")
    fun monthlySummary(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) referenceDate: LocalDate
    ): MonthlyBudgetSummaryResponse {
        val summary = receiptService.monthlyBudgetSummary(referenceDate)
        return MonthlyBudgetSummaryResponse(
            referenceMonth = summary.referenceMonth,
            totalSpent = summary.totalSpent,
            budgetLimit = summary.budgetLimit,
            categories = summary.categories.map {
                BudgetCategoryResponse(it.name, it.total)
            }
        )
    }
}

data class CreateReceiptRequest(
    @field:NotBlank val merchantName: String,
    @field:NotNull val purchasedAt: LocalDate,
    @field:NotNull val totalAmount: BigDecimal,
    @field:NotBlank val imagePath: String,
    @field:NotBlank val source: String
)

data class ReviewReceiptRequest(
    @field:NotBlank val merchantName: String,
    @field:NotNull val purchasedAt: LocalDate,
    @field:NotNull val totalAmount: BigDecimal,
    @field:NotEmpty val items: List<ReviewReceiptItemRequest>
)

data class ReviewReceiptItemRequest(
    val id: UUID?,
    @field:NotBlank val rawName: String,
    @field:NotBlank val normalizedName: String,
    @field:NotNull val quantity: BigDecimal,
    @field:NotBlank val unit: String,
    @field:NotNull val unitPrice: BigDecimal,
    @field:NotNull val lineTotal: BigDecimal,
    @field:NotNull val confidence: BigDecimal,
    val requiresReview: Boolean = false
)

data class ReceiptResponse(
    val id: UUID,
    val merchantName: String,
    val purchasedAt: LocalDate,
    val totalAmount: BigDecimal,
    val imagePath: String,
    val source: String,
    val status: String,
    val items: List<ReceiptItemResponse>
)

data class ReceiptItemResponse(
    val id: UUID,
    val rawName: String,
    val normalizedName: String,
    val quantity: BigDecimal,
    val unit: String,
    val unitPrice: BigDecimal,
    val lineTotal: BigDecimal,
    val confidence: BigDecimal,
    val requiresReview: Boolean
)

data class MonthlyBudgetSummaryResponse(
    val referenceMonth: String,
    val totalSpent: BigDecimal,
    val budgetLimit: BigDecimal,
    val categories: List<BudgetCategoryResponse>
)

data class BudgetCategoryResponse(
    val name: String,
    val total: BigDecimal
)

private fun Receipt.toResponse(): ReceiptResponse =
    ReceiptResponse(
        id = id,
        merchantName = merchantName,
        purchasedAt = purchasedAt,
        totalAmount = totalAmount,
        imagePath = imagePath,
        source = source,
        status = status.name,
        items = items.map {
            ReceiptItemResponse(
                id = it.id,
                rawName = it.rawName,
                normalizedName = it.normalizedName,
                quantity = it.quantity,
                unit = it.unit,
                unitPrice = it.unitPrice,
                lineTotal = it.lineTotal,
                confidence = it.confidence,
                requiresReview = it.requiresReview
            )
        }
    )
