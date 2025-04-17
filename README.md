# Self-Checkout System Prototype

## Overview

This project is a prototype of a self-checkout system for grocery stores, implemented as a web application using React with Next.js. Our team chose this technology stack because group members were more comfortable with web development, allowing us to rapidly prototype a functional system with a modern UI.

The application simulates the entire self-checkout flow, from product scanning to payment processing, including features like weighing products, barcode scanning using the camera, and fidelity card integration. Additionally, it includes a manager dashboard to block the system (for maintenance or other reasons) and view revenue statistics. A cashier mode is also available, providing functionalities to assist users, such as removing products, manually adding items or offers, and restarting the system.

## Getting Started

To run this application locally:

```bash
# Install dependencies (using legacy peer deps because of version conflicts in some packages)
npm i --legacy-peer-deps

# Build the application
npm run build

# Start the production server
npm run start
```

The application will be available at http://localhost:3000. Remember to have a camera available (with the browser permissions granted) for the barcode scanning functionality.

You can also run the application in development mode using:

```bash
npm run dev
```

## Implemented Functionality

Here's a summary of the key features implemented in the prototype. For a more detailed overview and explanations of the design choices, please refer to the project report.

### Barcode Scanning

The barcode scanning was implemented using the device camera through a third-party library. While this approach isn't as fast or precise as a dedicated infrared scanner that we usually find in supermarkets, it provides a functional demonstration of the scanning process. We added audio feedback (beep sound) when a product is successfully scanned to enhance the user experience through auditory confirmation.

The scanner is shown in a floating window that can be dragged around the screen and minimized, allowing users to position it conveniently. In a real-world application, this would be a physical scanner mounted on the checkout terminal, so this feature was implemented to make it easier to see where the item should be placed for scanning.

### Product Weighing

The products are divided into two categories: fruits and vegetables. The user can select the category, and the system will display an alphabetically ordered list of items (with a search bar), with their respective prices per kilogram. The user can then select an item, and the system will prompt them to weigh it.

Since physical scales couldn't be integrated into the web application, we implemented a simulation for the weighing process. When prompted to weigh their item, users can click anywhere on the screen to generate a random weight. The system then calculates the price based on the weight and the per-kilogram cost of the selected fruit or vegetable.

### Payment Processing

The payment methods (credit/debit card, gift card, food vouchers, and cash) are simulated since physical payment terminals cannot be connected. We provide a simple interface where users can click to simulate the payment process, including change calculation for cash payments.

### Cashier Mode

The Cashier Mode provides a secure interface for store staff to assist customers during checkout. Accessed via a special barcode scan and PIN authentication (987654), this mode transforms the interface to show cashier-specific options.

This functionality includes applying promotional discounts, manually entering barcodes for unscannable items, removing products from the cart, and resetting the system for a new customer.

### Manager Dashboard

The Manager Dashboard provides an admin interface for system control and monitoring. It also needs a PIN authentication (123456) to access the functionalities. Managers can block/unblock the system and view sales statistics, including total revenue, total sales, and top-selling items. In this implementation, all data is mocked and does not reflect actual transactions made in the prototype, since we did not implement a backend database.

### Other Key Features

- **Language Selection**: Users can choose from multiple languages at the start (although in this prototype only English is implemented, because of time constraints)
- **Fidelity Card System**: Fidelity cards can be scanned or entered manually. The user is prompted both before and after scanning items to enter their card, or they can enter it at any time during the scanning process. They can choose to skip this step if they don't have a card.
- **Error Handling**: The system provides error screens for common issues, such as scale-related problems, and a general error screen for unexpected issues, with an explanation of the problem.
- **Inactivity Detection**: Auto-reset after 2 minutes of inactivity
- **Touch-Friendly UI**: Designed for touchscreen interfaces

## User Interface

The interface is designed to be intuitive and accessible on self-checkout touchscreens. Key design choices include:

- **Clean, High-Contrast Interface**: Large, easy-to-read text and buttons
- **Consistent Color Scheme**: Purple as the primary color with appropriate contrasts
- **Consistent positioning**: Similar layout across different screens for familiarity
- **Clear Instructions**: Step-by-step guidance throughout the checkout process
- **Visual Feedback**: Visual indications for successful actions (scanning, weighing)

## Code Organization

The project follows a structured organization:

```
src/
├── app/                   # Next.js app router pages
│   ├── blocked/           # System blocked page
│   ├── client/            # Customer-facing pages
│   │   ├── errors/        # Error screens
│   │   ├── fidelity/      # Loyalty card screen
│   │   ├── language/      # Language selection
│   │   ├── payment/       # Payment flow screens
│   │   ├── scan/          # Main scanning screen
│   │   └── weight/        # Weighing flow screens
│   └── manager/           # Manager dashboard
├── context/               # React context providers
│   ├── BarcodeScannerContext.js  # Barcode scanning logic
│   ├── KeyboardContext.js        # Virtual keyboard management
│   └── StoreContext.js           # Store/product state management
└── ui/                    # Reusable UI components
    ├── components/        # General components
    └── modals/            # Modal dialogs
```

## Simulated Hardware

Since this is a web-based prototype, several hardware components are simulated:

- **Barcode Scanner**: Uses camera instead of dedicated scanner
- **Scale**: Simulated by clicking to generate random weights
- **Payment Terminal**: Visual simulation of payment flows
- **Receipt Printer**: Simulated with on-screen ticket options

This approach allowed us to create a comprehensive prototype that demonstrates the complete user flow without requiring specialized hardware integration.
