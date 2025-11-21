
# Firestore Data Model for George Wood Casket

This document outlines the complete Firestore database schema, including collections, document structures, and indexes.

---

## 1. `products`

Stores the details for each casket or product available for sale.

-   **Document ID:** `productId` (auto-generated)
-   **Collection Path:** `/products/{productId}`

| Field                 | Type                 | Description                                                                                                   |
| --------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `name`                | `string`             | The product's official name.                                                                                 |
| `slug`                | `string`             | URL-friendly version of the name.                                                                             |
| `label`               | `string`             | Short promotional label (e.g., "Best Seller", "New Arrival").                                                   |
| `description`         | `string`             | Detailed product description.                                                                                 |
| `price`               | `number`             | Price in the minor currency unit (e.g., kobo for NGN).                                                        |
| `currency`            | `string`             | 3-letter currency code (e.g., "NGN").                                                                         |
| `dimensions`          | `map`                | Object with `length`, `width`, `height` in a standard unit (e.g., inches).                                      |
| `colors`              | `array` of `string`  | Available color options.                                                                                      |
| `sizes`               | `array` of `string`  | Available size options.                                                                                       |
| `status`              | `string`             | Enum: `in_stock`, `low_stock`, `made_to_order`, `reserved`, `sold`.                                           |
| `availability`        | `map`                | Object with `productionStartDate`, `readyDate` (timestamps), `leadTimeDays` (number).                         |
| `stockQuantity`       | `number`             | Current number of items in stock.                                                                             |
| `images`              | `array` of `string`  | Array of Firebase Storage paths for product images.                                                           |
| `thumbnail`           | `string`             | Firebase Storage path for the primary thumbnail image.                                                        |
| `createdBy`           | `string`             | `uid` of the admin who created the product.                                                                   |
| `createdAt`           | `timestamp`          | Timestamp of product creation.                                                                                |
| `updatedAt`           | `timestamp`          | Timestamp of the last update.                                                                                 |
| `metadata`            | `map`                | For multilingual fields (`{en: "desc", ig: "nkowa"}`) or regional pricing (`{NG: 15000000, GH: 25000}`).     |

**Example Document:**

```json
{
  "name": "The Royal Elegance",
  "slug": "the-royal-elegance",
  "label": "Premium",
  "description": "A majestic casket crafted from the finest mahogany...",
  "price": 55000000,
  "currency": "NGN",
  "dimensions": { "length": 80, "width": 28, "height": 24 },
  "colors": ["Walnut Brown", "Ebony Black"],
  "status": "in_stock",
  "stockQuantity": 5,
  "images": [
    "products/royal-elegance-1.jpg",
    "products/royal-elegance-2.jpg"
  ],
  "thumbnail": "products/royal-elegance-thumb.jpg",
  "createdBy": "admin_user_uid",
  "createdAt": "2023-10-27T10:00:00Z",
  "updatedAt": "2023-10-27T10:00:00Z"
}
```

---

## 2. `orders`

Contains all customer order information.

-   **Document ID:** `orderId` (auto-generated)
-   **Collection Path:** `/orders/{orderId}`

| Field             | Type                 | Description                                                                                                                                  |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `customerId`      | `string`             | `uid` of the registered customer. Null for guest checkouts.                                                                                  |
| `customerInfo`    | `map`                | Customer's details: `name`, `email`, `phone`, `address` (object).                                                                           |
| `items`           | `array` of `map`     | Array of product items: `{ productId, name, qty, unitPrice, subtotal }`.                                                                     |
| `subtotal`        | `number`             | Sum of item subtotals.                                                                                                                       |
| `tax`             | `number`             | Tax amount.                                                                                                                                  |
| `shipping`        | `number`             | Shipping cost.                                                                                                                               |
| `total`           | `number`             | The final amount to be paid (`subtotal` + `tax` + `shipping`).                                                                               |
| `paymentMethod`   | `string`             | `invoice`, `paystack`, `flutterwave`, `bank_transfer`.                                                                                       |
| `paymentStatus`   | `string`             | `pending`, `partially_paid`, `paid`, `failed`, `refunded`.                                                                                   |
| `depositAmount`   | `number`             | Amount paid as a deposit.                                                                                                                    |
| `balance`         | `number`             | Remaining balance.                                                                                                                           |
| `invoiceId`       | `string`             | Reference to the associated invoice document.                                                                                                |
| `orderStatus`     | `string`             | `pending`, `reserved`, `confirmed`, `shipped`, `delivered`, `cancelled`.                                                                     |
| `createdAt`       | `timestamp`          | Timestamp of order creation.                                                                                                                 |
| `updatedAt`       | `timestamp`          | Timestamp of the last update.                                                                                                                |
| `notes`           | `string`             | Optional notes from the customer or admin.                                                                                                   |

---

## 3. `invoices`

Stores invoice data, including a reference to the generated PDF in Storage.

-   **Document ID:** `invoiceId` (auto-generated or custom unique ID)
-   **Collection Path:** `/invoices/{invoiceId}`

| Field             | Type                 | Description                                                       |
| ----------------- | -------------------- | ----------------------------------------------------------------- |
| `orderId`         | `string`             | The ID of the corresponding order.                                |
| `customerInfo`    | `map`                | Copied from the order for record-keeping.                         |
| `amountDue`       | `number`             | Total amount due for this invoice.                                |
| `dueDate`         | `timestamp`          | Date the invoice is due.                                          |
| `status`          | `string`             | `pending`, `partially_paid`, `paid`, `expired`.                   |
| `pdfPath`         | `string`             | Firebase Storage path to the invoice PDF.                         |
| `createdAt`       | `timestamp`          | Timestamp of invoice creation.                                    |
| `sentAt`          | `timestamp`          | Timestamp when the invoice email was sent.                        |
| `paidAt`          | `timestamp`          | Timestamp when the invoice was fully paid.                        |
| `lineItems`       | `array` of `map`     | Copied from the order for record-keeping.                         |
| `expiryPolicy`    | `map`                | `{ "daysUntilExpiry": 30 }`.                                      |

---

## 4. `payments`

Tracks all payment attempts and their statuses.

-   **Document ID:** `paymentId` (gateway reference ID)
-   **Collection Path:** `/payments/{paymentId}`

| Field               | Type        | Description                                                               |
| ------------------- | ----------- | ------------------------------------------------------------------------- |
| `orderId`           | `string`    | The associated order ID.                                                  |
| `invoiceId`         | `string`    | The associated invoice ID.                                                |
| `gateway`           | `string`    | `paystack`, `flutterwave`, `bank`.                                        |
| `amount`            | `number`    | Amount processed.                                                         |
| `currency`          | `string`    | Currency code.                                                            |
| `status`            | `string`    | Gateway status (e.g., `success`, `failed`).                               |
| `verifiedAt`        | `timestamp` | Timestamp when the webhook confirmed the payment.                         |
| `rawGatewayResponse`| `map`       | The full, raw response from the payment gateway for auditing.             |
| `createdAt`         | `timestamp` | Timestamp of payment initiation.                                          |

---

## 5. `users` & `activityLogs`

Stores user profile information and a log of their activities.

-   **Collection Path:** `/users/{uid}` (where `uid` is the Firebase Auth user ID)

| Field             | Type                | Description                                                          |
| ----------------- | ------------------- | -------------------------------------------------------------------- |
| `email`           | `string`            | User's email address.                                               |
| `name`            | `string`            | User's full name.                                                   |
| `phone`           | `string`            | User's phone number.                                                |
| `roles`           | `array` of `string` | Deprecated in favor of custom claims, but can be used for reference. |
| `createdAt`       | `timestamp`         | Timestamp of user registration.                                      |
| `profilePicPath`  | `string`            | Storage path for the user's profile picture.                        |

-   **Subcollection:** `activityLogs`
-   **Path:** `/users/{uid}/activityLogs/{logId}`

| Field       | Type        | Description                                                          |
| ----------- | ----------- | -------------------------------------------------------------------- |
| `type`      | `string`    | `order_created`, `invoice_sent`, `login`, `payment_verified`.        |
| `actorId`   | `string`    | `uid` of the user performing the action.                             |
| `details`   | `map`       | Context-specific details about the event.                            |
| `timestamp` | `timestamp` | Timestamp of the activity.                                           |

---

## 6. `audits`

A global collection for tracking all administrative actions.

-   **Document ID:** `auditId` (auto-generated)
-   **Collection Path:** `/audits/{auditId}`

| Field              | Type        | Description                                                                 |
| ------------------ | ----------- | --------------------------------------------------------------------------- |
| `action`           | `string`    | e.g., `product_update`, `order_status_change`.                              |
| `targetCollection` | `string`    | The collection that was modified (e.g., "products").                        |
| `targetId`         | `string`    | The document ID that was modified.                                          |
| `changes`          | `map`       | Object containing `before` and `after` states of the data.                  |
| `adminId`          | `string`    | `uid` of the admin who performed the action.                                |
| `timestamp`        | `timestamp` | Timestamp of the audit log.                                                 |

---

## And the rest of the collections...

I will create the documentation for the remaining collections: `tributes`, `bonds`, `investments`, `customOrders`, `impressions`, and `recommendations` in subsequent steps, along with the necessary Cloud Functions and security rules.

### Suggested Composite Indexes

To ensure efficient querying, the following composite indexes should be created in Firestore:

1.  **Products by Status and Price:**
    -   Collection: `products`
    -   Fields: `status` (Ascending), `price` (Ascending)
    -   Purpose: For filtering products by availability and sorting by price.

2.  **Orders by Customer and Date:**
    -   Collection: `orders`
    -   Fields: `customerId` (Ascending), `createdAt` (Descending)
    -   Purpose: To allow customers to view their order history.

3.  **Invoices by Status and Due Date:**
    -   Collection: `invoices`
    -   Fields: `status` (Ascending), `dueDate` (Ascending)
    -   Purpose: For background jobs to find and process expired invoices.

I will now proceed to create the folder structure for the Cloud Functions.
