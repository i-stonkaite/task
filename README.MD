# Demo Tests

## Getting Started

This section provides instructions on how to set up the tests locally.

### Prerequisites

Make sure you have npm (Node Package Manager) installed. If not, you can install the latest version using the following command:

```bash
npm install npm@latest -g
```

### Install dependencies

Make sure necessary dependencies are installed. Installation command:

```bash
npm install
```

### Environment variables

Add .env file to a root directory. Fill values, example values provided in .env.example file.

### Launching tests

To launch tests use the scripts provided in package.json. The following commands can be used in root dir:

Launch frontend test:

```bash
npm run test:fe
```

Launch backend tests:

```bash
npm run test:be
```

Launch all tests:

```bash
npm run test:all
```

### If error occurs

Please validate that playwright browsers installed successfully
