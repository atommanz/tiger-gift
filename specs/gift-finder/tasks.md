# Tasks: FTC Gift Finder Implementation Plan

## Implementation Tasks

### Setup & Data Preparation

- [ ] 1. Create products.json with 25 FTC products
  - [ ] 1.1 Define JSON structure with all required fields (id, name, price, image, tags)
  - [ ] 1.2 Create 25 product entries with Thai names and diverse tag combinations
  - [ ] 1.3 Use placeholder images from placehold.co or local /images folder
  - [ ] 1.4 Validate all products have complete tag sets (gender, age, relationship, occasion, budget, style)
  
  _Requirements: 5_

- [ ] 2. Install canvas-confetti dependency
  
  _Requirements: 4_

---

### Core Data Types & Utilities

- [ ] 3. Create TypeScript interfaces
  - [ ] 3.1 Define `Product` interface in app/page.tsx
  - [ ] 3.2 Define `FormData` interface
  - [ ] 3.3 Define `CartItem` interface
  - [ ] 3.4 Define View type union: `'form' | 'loading' | 'feed' | 'cart' | 'celebration'`
  
  _Requirements: 1, 2, 3, 5_

- [ ] 4. Implement utility functions
  - [ ] 4.1 Implement `filterProducts(products, formData)` with scoring algorithm
  - [ ] 4.2 Implement `calculateTotal(cart)`
  - [ ] 4.3 Implement `addToCart(product, cart, setCart)`
  - [ ] 4.4 Implement `updateQuantity(productId, delta, cart, setCart)`
  
  _Requirements: 2, 3_

- [ ] 5. Checkpoint - Verify utility functions with sample data

---

### Main Component State Management

- [ ] 6. Set up main component state in app/page.tsx
  - [ ] 6.1 Add 'use client' directive at top of file
  - [ ] 6.2 Initialize all state variables (view, formStep, formData, cart, products, filteredProducts)
  - [ ] 6.3 Add useEffect to load products.json on mount
  - [ ] 6.4 Add error handling for products.json fetch failure
  
  _Requirements: 1, 2, 3, 5_

---

### FormView Implementation

- [ ] 7. Build FormView sub-component
  - [ ] 7.1 Create Progress Bar component showing formStep/6
  - [ ] 7.2 Implement question renderer with switch statement for 6 steps
  - [ ] 7.3 Add option buttons for each question (gender, age, relationship, occasion, budget, style)
  - [ ] 7.4 Wire "ถัดไป" button to update formData and increment formStep
  - [ ] 7.5 On step 6 completion, transition to loading view
  
  _Requirements: 1_

- [ ] 8. Style FormView with Tailwind CSS
  - [ ] 8.1 Mobile-first layout (full screen, centered content)
  - [ ] 8.2 Progress bar styling (bg-gray-200 with bg-primary fill)
  - [ ] 8.3 Option buttons with touch-friendly size (min 44px height)
  - [ ] 8.4 Thai typography with Geist Sans font
  
  _Requirements: 1, 6_

- [ ] 9. Checkpoint - Test form flow from step 1 to 6

---

### LoadingView Implementation

- [ ] 10. Build LoadingView sub-component
  - [ ] 10.1 Add spinner animation (Tailwind animate-spin)
  - [ ] 10.2 Display "กำลังค้นหาของขวัญ..." text
  - [ ] 10.3 Add useEffect to filter products after 2.5 seconds
  - [ ] 10.4 Transition to feed view after filtering complete
  
  _Requirements: 2_

---

### FeedView Implementation

- [ ] 11. Build FeedView sub-component
  - [ ] 11.1 Create scrollable container with snap-y snap-mandatory CSS
  - [ ] 11.2 Render filteredProducts as full-screen cards
  - [ ] 11.3 Add Cart Badge to top-right corner showing cart item count
  - [ ] 11.4 Add "เพิ่มลงตะกร้า" button to each product card
  - [ ] 11.5 Wire button click to addToCart function
  - [ ] 11.6 Wire Cart Badge click to open cart view
  
  _Requirements: 2, 3_

- [ ] 12. Style product cards
  - [ ] 12.1 Full-width image with Next.js Image component (width 400, height 400)
  - [ ] 12.2 Product name in Thai (text-lg font-bold)
  - [ ] 12.3 Price display (text-xl with ฿ symbol)
  - [ ] 12.4 Button styling (bg-primary text-white rounded-lg px-6 py-3)
  - [ ] 12.5 Snap scroll alignment (snap-start snap-always)
  
  _Requirements: 2, 6_

- [ ] 13. Checkpoint - Test product feed scrolling and add-to-cart functionality

---

### CartView Implementation

- [ ] 14. Build CartView sub-component
  - [ ] 14.1 Render list of cart items with product image, name, price
  - [ ] 14.2 Add +/- buttons for quantity control per item
  - [ ] 14.3 Wire quantity buttons to updateQuantity function
  - [ ] 14.4 Display calculated total price at bottom
  - [ ] 14.5 Add Text Area for gift message (Thai placeholder)
  - [ ] 14.6 Add "ชำระเงิน" button that transitions to celebration view
  - [ ] 14.7 Add "กลับไปเลือกสินค้า" button that returns to feed view
  
  _Requirements: 3_

- [ ] 15. Style CartView with Tailwind CSS
  - [ ] 15.1 Item cards with flexbox layout (image left, details right)
  - [ ] 15.2 Quantity controls with rounded buttons
  - [ ] 15.3 Total price display (text-2xl font-bold)
  - [ ] 15.4 Gift message textarea with Thai font
  - [ ] 15.5 Checkout button styling (full-width on mobile)
  
  _Requirements: 3, 6_

- [ ] 16. Checkpoint - Test cart operations (add, update quantity, remove, checkout)

---

### CelebrationView Implementation

- [ ] 17. Build CelebrationView sub-component
  - [ ] 17.1 Import and configure canvas-confetti
  - [ ] 17.2 Trigger confetti animation on view mount (useEffect)
  - [ ] 17.3 Display "สั่งซื้อสำเร็จ! 🎉" message
  - [ ] 17.4 Show order summary (cart items + total)
  - [ ] 17.5 Add "กลับหน้าแรก" button that resets all state
  
  _Requirements: 4_

- [ ] 18. Style CelebrationView
  - [ ] 18.1 Centered layout with celebration message (text-3xl font-bold)
  - [ ] 18.2 Order summary card styling
  - [ ] 18.3 Button styling for return home action
  
  _Requirements: 4, 6_

- [ ] 19. Checkpoint - Test checkout flow and celebration animation

---

### View State Orchestration

- [ ] 20. Wire all view transitions
  - [ ] 20.1 Form complete → loading view
  - [ ] 20.2 Loading complete → feed view
  - [ ] 20.3 Cart badge click → cart view
  - [ ] 20.4 Cart back button → feed view
  - [ ] 20.5 Cart checkout button → celebration view
  - [ ] 20.6 Celebration back button → form view (reset state)
  
  _Requirements: 1, 2, 3, 4_

- [ ] 21. Checkpoint - Test complete user journey from form to celebration

---

### Error Handling & Edge Cases

- [ ] 22. Add error handling
  - [ ] 22.1 Handle products.json fetch failure with retry UI
  - [ ] 22.2 Show placeholder for failed product images
  - [ ] 22.3 Handle empty filteredProducts case (show "ไม่พบสินค้า" message)
  - [ ] 22.4 Disable checkout button when cart is empty
  
  _Requirements: 2, 3, 5_

- [ ] 23. Checkpoint - Test error scenarios (network failure, empty results, empty cart)

---

### Polish & Optimization

- [ ]* 24. Add loading states and transitions
  - [ ]* 24.1 Add CSS transitions for view changes (fade in/out)
  - [ ]* 24.2 Add hover states for buttons
  - [ ]* 24.3 Add active states for touch interactions
  
  _Requirements: 6_

- [ ]* 25. Optimize images
  - [ ]* 25.1 Add Next.js Image optimization with proper sizes
  - [ ]* 25.2 Add loading="lazy" for off-screen products
  
  _Requirements: 6_

- [ ] 26. Final checkpoint - Complete manual testing checklist from design.md

---

## Task Summary

- **Total tasks**: 26 (22 required, 4 optional)
- **Checkpoints**: 7
- **Estimated time**: 4-5 hours
- **Requirements coverage**: All 6 requirements covered

### Requirements Traceability

- **Req 1 (Multi-step Form)**: Tasks 7, 8, 9, 20
- **Req 2 (Product Feed)**: Tasks 4, 10, 11, 12, 13, 20, 22
- **Req 3 (Shopping Cart)**: Tasks 3, 4, 14, 15, 16, 20, 22
- **Req 4 (Celebration)**: Tasks 2, 17, 18, 19, 20
- **Req 5 (Mock Data)**: Tasks 1, 3, 6, 22
- **Req 6 (Mobile-First)**: Tasks 8, 12, 15, 18, 24, 25
