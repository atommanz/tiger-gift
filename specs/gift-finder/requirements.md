# Requirements: Gift Finder

## Introduction

Tiger Gift is an intelligent gift recommendation web application for Flying Tiger Copenhagen (Index Living Mall). The system guides users through a multi-step questionnaire to collect gift recipient preferences, displays personalized product recommendations in a TikTok-style feed, and provides a seamless checkout flow with gift message capability — all within 3-5 minutes from start to finish.

## Glossary

- **Gift Recipient**: The person who will receive the gift (not the user of the application)
- **Multi-step Form**: A 6-screen wizard that collects gift recipient attributes one question at a time
- **Product Feed**: A vertical scrolling interface displaying one product card at full-screen height, similar to TikTok's video feed
- **Snap Scroll**: Scroll behavior that automatically snaps each product card to fill the viewport
- **Cart Badge**: A numerical counter displayed on the shopping cart icon showing the number of items added
- **Filtering Logic**: Simple tag-based matching between user selections and product metadata (not AI/ML)
- **Mock Data**: Static JSON file containing 20-30 FTC products with metadata for filtering

## Requirements

### Requirement 1: Gift Recipient Profile Collection

**User Story:** As a user looking for a gift, I want to answer simple questions about the recipient, so that the system can recommend appropriate products.

#### Acceptance Criteria

1. WHEN the user visits the application, THE System SHALL display the first question screen asking for the recipient's gender (ชาย / หญิง / ไม่ระบุ)
2. WHEN the user selects a gender option, THE System SHALL display a "Next" button to proceed to the next screen
3. WHEN the user proceeds through all 6 screens (gender, age range, relationship, occasion, budget, style), THE System SHALL collect and store all selections
4. WHILE navigating through the form, THE System SHALL display a progress bar indicating the current step (1/6, 2/6, etc.)
5. WHEN the user completes all 6 screens, THE System SHALL transition to the loading screen within 500ms

**Form Screens:**
- Screen 1: Gender (ชาย / หญิง / ไม่ระบุ)
- Screen 2: Age Range (เด็ก / วัยรุ่น / วัยทำงาน / ผู้ใหญ่)
- Screen 3: Relationship (แฟน / เพื่อน / พ่อแม่ / เจ้านาย)
- Screen 4: Occasion (วันเกิด / ปีใหม่ / ขึ้นบ้านใหม่ / ขอบคุณ)
- Screen 5: Budget (< 300 / 300-500 / 500-1,000 / 1,000+)
- Screen 6: Style (น่ารัก / มินิมอล / สนุกสนาน / Practical)

### Requirement 2: Loading Experience and Product Filtering

**User Story:** As a user who has completed the questionnaire, I want to see a loading animation while my preferences are processed, so that I know the system is working.

#### Acceptance Criteria

1. WHEN the user completes the 6-screen form, THE System SHALL display a loading animation for 2-3 seconds with the message "กำลังเลือกของขวัญให้คุณ..."
2. WHILE the loading screen is displayed, THE System SHALL filter the product catalog based on the user's selections using tag-based matching logic
3. WHEN filtering is complete, THE System SHALL select 15-20 products that match the user's criteria
4. WHEN the filtered product list is ready, THE System SHALL automatically transition to the Product Feed screen

### Requirement 3: TikTok-Style Product Discovery

**User Story:** As a user browsing gift recommendations, I want to scroll through products one at a time in a full-screen format, so that I can focus on each item individually.

#### Acceptance Criteria

1. WHEN the user enters the Product Feed screen, THE System SHALL display one product card at full viewport height
2. WHEN the user scrolls vertically, THE System SHALL snap each product card to fill the viewport (snap scroll behavior)
3. WHEN a product card is displayed, THE System SHALL show the product image, name (in Thai), price (THB), and an "Add to Cart" button
4. WHILE browsing the feed, THE System SHALL display a cart icon in the top-right corner with a badge counter showing the number of items in the cart
5. IF the cart contains more than 99 items, THEN THE System SHALL display "99+" on the badge counter

### Requirement 4: Shopping Cart Management

**User Story:** As a user who has selected products, I want to add items to my cart and adjust quantities, so that I can purchase multiple gifts or multiple quantities of the same item.

#### Acceptance Criteria

1. WHEN the user clicks "Add to Cart" on a product card, THE System SHALL add the product to the cart and update the badge counter within 200ms
2. WHEN the user taps the cart icon, THE System SHALL navigate to the Cart page displaying all selected products
3. WHEN viewing the Cart page, THE System SHALL display each product with its image, name, price, and quantity controls (+ and - buttons)
4. WHEN the user clicks the + or - buttons, THE System SHALL immediately update the quantity and recalculate the total price
5. IF the user reduces quantity to 0, THEN THE System SHALL remove the item from the cart
6. WHEN the cart contents change, THE System SHALL display the updated total price in THB

### Requirement 5: Gift Message and Checkout

**User Story:** As a user ready to purchase, I want to add a personal message to my gift and complete the checkout process, so that I can finalize my gift purchase.

#### Acceptance Criteria

1. WHEN viewing the Cart page, THE System SHALL display a text area labeled for writing a gift card message (การ์ดอวยพร)
2. WHEN the user types in the gift message field, THE System SHALL store the message text
3. WHEN the user clicks the "Checkout" button, THE System SHALL transition to the Celebration screen within 500ms
4. WHEN the Celebration screen loads, THE System SHALL display a full-screen confetti or fireworks animation
5. WHEN the Celebration screen loads, THE System SHALL display the message "ของขวัญพร้อมส่งแล้ว! 🎉"

### Requirement 6: Mobile-First Responsive Design

**User Story:** As a mobile user, I want the application to work smoothly on my smartphone, so that I can browse and purchase gifts on the go.

#### Acceptance Criteria

1. WHEN the user accesses the application on a mobile device (viewport width < 768px), THE System SHALL display all screens optimized for mobile viewports
2. WHEN the user interacts with any button or form element, THE System SHALL provide touch-friendly tap targets (minimum 44×44px)
3. WHEN the user scrolls the Product Feed, THE System SHALL provide smooth scroll animations at 60fps or higher
4. WHILE using the application, THE System SHALL maintain all functionality and visual hierarchy on mobile devices
5. WHERE the user accesses from desktop devices, THE System SHALL display the mobile-optimized view centered on the screen (no separate desktop layout required)

### Requirement 7: Performance and Demo Readiness

**User Story:** As a hackathon judge, I want to see a smooth end-to-end demo without delays or errors, so that I can evaluate the concept effectively.

#### Acceptance Criteria

1. WHEN the user navigates between any screens, THE System SHALL complete transitions within 500ms
2. WHEN the entire user journey is completed (form → loading → feed → cart → checkout), THE System SHALL take less than 5 minutes of user interaction time
3. WHEN product images are loaded, THE System SHALL display optimized images that load within 2 seconds on 3G connection speeds
4. WHILE running the demo, THE System SHALL maintain smooth animations and interactions with no visual stuttering
5. IF any operation fails, THEN THE System SHALL display a user-friendly error message in Thai
