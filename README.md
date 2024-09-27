# LIFF App Proof of Concept (PoC)

## Overview

This repository contains the Proof of Concept (PoC) for a web application built using the LINE Front-end Framework (LIFF). The app demonstrates how to integrate with the LINE platform to access user data, send messages, and utilize other features of the LINE ecosystem.

## Features

User Profile Access: Retrieve LINE user profile information (display name, profile picture, etc.).
Message Sending: Send predefined messages to users via the LINE app.
Browser and External Links: Open external URLs within the LINE app’s web view.
Custom UI: Lightweight, responsive web UI designed to work seamlessly within the LINE app.
Installation
Clone the repository:

```bash
# Copy code
git clone https://github.com/your-username/liff-poc.git
cd liff-poc
```

## Install dependencies:

```bash
# Copy code
npm install
```

### Set up your LINE Login channel and add your LIFF app ID in the .env file:

```bash
Copy code
LIFF_ID=your_liff_id
```

### Run the development server:

```bash
Copy code
npm run dev
```

Open the app in your LINE app or browser to test.

## Usage

- Open the app using the provided URL or a QR code.
- Grant the app access to your LINE profile when prompted.
- Interact with the features, such as retrieving your profile information and sending messages.

## Technologies Used

- LINE Front-end Framework (LIFF)
- JavaScript (React)
- Next.js
- Node.js

## License

This project is licensed under the MIT License. See the LICENSE file for details.
