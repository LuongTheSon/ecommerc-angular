# Modern E-Commerce Store - Angular

Ứng dụng e-commerce hiện đại được xây dựng bằng **Angular 20** với các công nghệ và best practices mới nhất.

## 🎯 Tính năng chính

### 🛍️ Quản lý sản phẩm

- ✅ Hiển thị danh sách sản phẩm với lọc theo danh mục
- ✅ Chi tiết sản phẩm (tên, giá, mô tả, đánh giá, hình ảnh)
- ✅ Trạng thái kho hàng (In stock / Out of stock)
- ✅ Sidebar filter danh mục (responsive)

### ❤️ Danh sách yêu thích (Wishlist)

- ✅ Thêm/xóa sản phẩm yêu thích
- ✅ Lưu vào localStorage (persist)
- ✅ Badge count hiển thị số lượng

### 🛒 Giỏ hàng

- ✅ Thêm sản phẩm với số lượng tuỳ chỉnh
- ✅ Cập nhật số lượng
- ✅ Xóa sản phẩm khỏi giỏ
- ✅ Tính tổng tiền (subtotal + tax)
- ✅ Persist giỏ hàng vào localStorage

### 💳 Thanh toán

- ✅ Form giao hàng với validation
- ✅ Chọn phương thức thanh toán (Credit Card, PayPal, Bank Transfer, Mobile Payment)
- ✅ Route guard: chặn không cho vào checkout khi giỏ hàng trống
- ✅ Trang xác nhận đặt hàng

### 👤 Xác thực

- ✅ Dialog đăng nhập/đăng ký
- ✅ Form validation chuyên nghiệp
- ✅ Password visibility toggle
- ✅ Link chuyển đổi giữa login/signup
- ✅ Tích hợp checkout flow

## 🏗️ Tech Stack

| Công nghệ            | Phiên bản | Mục đích         |
| -------------------- | --------- | ---------------- |
| **Angular**          | 20.3      | Framework chính  |
| **TypeScript**       | Latest    | Ngôn ngữ         |
| **NgRx Signals**     | -         | State management |
| **Angular Material** | v19       | UI Components    |
| **Tailwind CSS**     | 3.x       | Styling          |
| **Reactive Forms**   | -         | Form validation  |
| **Hot Toast**        | -         | Notifications    |
| **RxJS**             | -         | Async handling   |

## 📁 Cấu trúc dự án

```
frontend/src/app/
├── app.ts                    # Root component
├── app.config.ts             # App configuration
├── app.routes.ts             # Route definitions
├── ecommerce-store.ts        # State management (NgRx Signals)
│
├── guards/
│   └── can-checkout.guard.ts # Route guard cho checkout
│
├── directives/
│   └── panel.ts              # Panel directive
│
├── models/
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   └── user.ts
│
├── services/
│   └── toaster.ts            # Toast notification service
│
├── layout/
│   ├── header/
│   │   ├── header.ts
│   │   └── header-actions/   # Login/Cart/Wishlist buttons
│   └── products-list/        # Products page với sidebar filter
│
├── components/
│   ├── products-card/        # Product card component
│   ├── toggle-wishlist-button/
│   ├── back-button/
│   ├── summarize-order/      # Order summary
│   ├── sign-in-dialog/       # Login modal
│   └── sign-up-dialog/       # Signup modal
│
└── pages/
    ├── cart/                 # Giỏ hàng + item editor
    ├── checkout/             # Form thanh toán
    ├── product-detail/       # Chi tiết sản phẩm
    ├── my-wishlist/          # Trang yêu thích
    └── order-success/        # Xác nhận đặt hàng
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm hoặc yarn

### Steps

1. **Clone repository**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
ng serve
# hoặc
npm start
```

Truy cập `http://localhost:4200`

4. **Build for production**

```bash
ng build --configuration production
```

## 💡 Điểm nổi bật

### Modern Angular Patterns

- ✅ **Standalone Components** — Không cần NgModule
- ✅ **Signal-based State** — NgRx Signals thay vì RxJS observables
- ✅ **Zoneless Change Detection** — Hiệu suất tốt hơn
- ✅ **Reactive Forms** — Validation chuyên nghiệp
- ✅ **View Transitions** — Animation giữa routes

### Best Practices

- ✅ **Type Safety** — 100% TypeScript
- ✅ **Component Input Binding** — Dữ liệu từ URL tự động binding
- ✅ **Lazy Loading** — Tất cả routes load ở lazy mode
- ✅ **Local Storage Sync** — Persist state tự động
- ✅ **Route Guards** — Kiểm soát truy cập routes
- ✅ **Error Handling** — Form validation toàn diện

## 📝 Validation Rules

### Sign In Form

- Email: bắt buộc, định dạng email hợp lệ
- Password: bắt buộc

### Sign Up Form

- Name: bắt buộc
- Email: bắt buộc, định dạng email hợp lệ
- Password: bắt buộc, tối thiểu 6 ký tự
- Confirm Password: bắt buộc, phải khớp với password

### Shipping Form

- First Name, Last Name: bắt buộc
- Email: bắt buộc, định dạng email hợp lệ
- Phone: bắt buộc, 10 chữ số
- Address: bắt buộc
- Postal Code: bắt buộc, 5 chữ số

## 🔄 State Management

Dùng **ecommerce-store.ts** để quản lý toàn bộ state:

```typescript
// Computed values
store.filteredProducts(); // Sản phẩm theo danh mục
store.wishlistCount(); // Số item yêu thích
store.cartCount(); // Số item trong giỏ

// Methods
store.addToCart(product, quantity);
store.addToWishlist(product);
store.setCategory(category);
store.placeOrder();
store.signIn(params);
store.signOut();
```

## 📋 Checklist - Tính năng sắp tới

- [ ] **Search** — Tìm kiếm sản phẩm theo tên/keyword
- [ ] **Mobile Layout** — Giao diện hoàn toàn tối ưu mobile
- [ ] **Fetch API** — Kết nối backend thực tế
- [ ] **User Profile** — Trang cá nhân user
- [ ] **Order History** — Lịch sử đơn hàng
- [ ] **Product Sorting** — Sắp xếp (price, rating, newest)
- [ ] **Pagination** — Phân trang sản phẩm
- [ ] **Product Reviews** — Bình luận/đánh giá
- [ ] **Coupon/Discount** — Mã giảm giá
- [ ] **Payment Integration** — Thanh toán thực (Stripe, PayPal)
- [ ] **Email Notification** — Gửi email xác nhận đơn hàng
- [ ] **Admin Dashboard** — Quản lý sản phẩm/đơn hàng
- [ ] **Analytics** — Theo dõi hành vi user

## 🐛 Known Issues

- Dữ liệu sản phẩm hiện là mock data (file ecommerce-store.ts)
- Xác thực user là giả lập (chưa có backend)
- Payment chỉ là UI, không xử lý thanh toán

**Status:** 🚀 Development

**Last Updated:** April 2026

**Phiên bản Angular:** 20.x
