# Real-Time Messaging Application

A real-time messaging application built with **Angular**, **Node.js**, and **Express**. The application uses **Socket.IO** for real-time communication and **MongoDB** for persistent data storage.

Users can communicate through private and group chats, send images, manage their profiles, and perform account-related actions through a real-time socket-based architecture.

## Features

- **Real-time messaging** using Socket.IO.
- **Private conversations** between users.
- **Group chats** with no application-defined participant limit.
- **Image sharing** using Cloudinary for image hosting.
- **Profile management**, including:
- Change username.
- Change profile picture.

- **Account deletion**.
- **Real-time chat requests** using sockets.
- **Add users to existing groups** through socket communication.
- Real-time communication between connected clients.

## Tech Stack

### Frontend

- **Angular**
- **Bootstrap**
- **Socket.IO Client**

### Backend

- **Node.js**
- **Express**
- **Socket.IO**

### Database & Storage

- **MongoDB** — Persistent application data.
- **Cloudinary** — Image hosting and storage.

## Screenshots

### Main View

![Main View](./assets/sendit-assets/cap1.png)

### Login View

![Login View](./assets/sendit-assets/cap10.png)

### Group Chat

![Group Chat](./assets/sendit-assets/cap9.png)
![Group Chat 2](./assets/sendit-assets/cap4.png)

## Requests

![Requests](./assets/sendit-assets/cap3.png)

### Invite Friends

![Invite Friends](./assets/sendit-assets/cap8.png)

### Profile

![Profile](./assets/sendit-assets/cap7.png)

## Architecture

The application is divided into a frontend client and a backend server.

```text
                    ┌─────────────────────┐
                    │       Angular       │
                    │      Frontend       │
                    │                     │
                    │  Chat UI            │
                    │  Groups             │
                    │  Profiles           │
                    └──────────┬──────────┘
                               │
                               │ Socket.IO
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js / Express │
                    │      Backend        │
                    │                     │
                    │  Socket Management  │
                    │  Chat Logic         │
                    │  Group Logic        │
                    │  User Management    │
                    └──────┬────────┬─────┘
                           │        │
                    ┌──────▼───┐  ┌─▼───────────┐
                    │ MongoDB  │  │  Cloudinary │
                    │          │  │             │
                    │ Users    │  │   Images    │
                    │ Messages │  │   Storage   │
                    │ Groups   │  │             │
                    └──────────┘  └─────────────┘
```

## Real-Time Communication

The application relies heavily on **Socket.IO** for real-time communication.

Sockets are used not only for sending messages, but also for several chat-related operations, including:

- Sending and receiving messages.
- Starting conversations.
- Sending chat requests.
- Adding users to existing groups.
- Updating conversations in real time.

This allows connected clients to receive events without continuously polling the server through HTTP requests.

### Example message flow

```text
User A
   │
   │ Socket Event
   ▼
Node.js / Socket.IO
   │
   ├──────────────► MongoDB
   │
   │ Socket Event
   ▼
User B / Group
```

When a user sends a message:

1. The Angular client emits a socket event.
2. The Node.js server receives the event.
3. The message is processed and persisted in MongoDB.
4. The server emits the corresponding event to the recipient or group.
5. Connected clients receive the message in real time.

## Image Handling

Images are hosted using **Cloudinary** rather than being stored directly in MongoDB.

The general flow is:

```text
Angular
   │
   │ Image upload
   ▼
Cloudinary
   │
   │ Image URL
   ▼
Application
   │
   │ Message / Profile data
   ▼
MongoDB
```

Cloudinary handles the image storage, while the application stores the corresponding image reference.

## Group Chats

The application supports group conversations with **no predefined participant limit at the application level**.

Users can:

- Create group conversations.
- Add users to existing groups.
- Send messages to group members.
- Receive group messages in real time.

The practical scalability of a group will ultimately depend on the server, database, network, and infrastructure resources available.

## Profile Management

Users can manage their profile through the application.

Available actions include:

- Changing their username.
- Changing their profile picture.
- Deleting their account.

Profile images are handled through Cloudinary.

## Data Storage

**MongoDB** is used as the application's persistent database.

It is responsible for storing application data such as:

- Users.
- Messages.
- Conversations.
- Groups.
- Other persistent information required by the application.

Images themselves are hosted through Cloudinary.

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- pnpm (please)
- Angular CLI
- MongoDB
- A Cloudinary account

### Clone the repository

```bash
git clone <repository-url>

cd <project-directory>
```

### Install dependencies

Install the backend dependencies (USE PNPM):

```bash
pnpm install
```

Then install the Angular dependencies:

```bash
cd client
pnpm install
```

> Adjust the directory names according to the actual project structure.

## Environment Variables

The requires environment variables for services such as MongoDB and Cloudinary.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://<db_password>/<your_cluster>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Add your environment file to `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

## Running the Application

### Backend

```bash
pnpm run dev
```

or:

```bash
pnpm start
```

### Frontend

From the Angular project directory:

```bash
ng serve
```

The frontend will normally be available at:

```text
http://localhost:4200
```

The backend will run on the port configured in your environment variables.

## Project Highlights

This project focuses on implementing a **real-time, event-driven messaging architecture** rather than relying exclusively on traditional HTTP requests.

Socket.IO is used for both messaging and several chat-management operations, while MongoDB provides persistent storage and Cloudinary handles image hosting.

The architecture allows multiple connected clients to communicate and receive application events in real time.

## License
