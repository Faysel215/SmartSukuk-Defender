# SmartSukuk Defender: PQC Blockchain Wallet

## 🛡️ Overview

**SmartSukuk Defender** is a next-generation digital wallet and smart contract platform designed specifically for the Islamic Finance sector. It addresses the existential threat posed by future Quantum Computing to traditional blockchain cryptography (RSA/ECC).

By implementing **Post-Quantum Cryptography (PQC)** standards—specifically **Kyber** (Key Encapsulation) and **Dilithium** (Digital Signatures)—this application safeguards **Milkiyah** (ownership proofs) against Shor's algorithm and "Harvest Now, Decrypt Later" attacks, ensuring the sanctity and longevity of Halal digital assets.

## 🌟 Key Features

### 1. Quantum Security Dashboard
*   **Portfolio Analysis**: Real-time visualization of your Sukuk portfolio's value and "Quantum Immunity" score.
*   **Risk Detection**: Identifies assets secured by vulnerable legacy encryption (RSA-2048).

### 2. Interactive PQC Migration
*   **Upgrade Protocols**: A dedicated interface to migrate smart contracts from legacy standards to Lattice-based cryptography.
*   **Visual Feedback**: Step-by-step visualization of the ephemeral key generation (Kyber) and re-signing process (Dilithium).

### 3. Sentinel AI Advisor
*   **Powered by Google Gemini**: Uses the `gemini-2.5-flash` model to act as a specialized advisor.
*   **Expert Knowledge**: Provides context-aware answers regarding Shariah compliance, Sukuk structures (Ijarah, Murabahah), and cybersecurity risks.

### 4. Digital Sukuk Vault
*   **Asset Management**: detailed view of asset maturity, value, and ownership hashes.
*   **Security Badges**: Clear distinction between 'Legacy' and 'PQC Secured' assets.

## 🏗️ Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Engine**: Google GenAI SDK (`@google/genai`)
*   **Data Visualization**: Recharts
*   **Icons**: Lucide React

## 🔐 Security Concepts

### The Threat: "Harvest Now, Decrypt Later"
Adversaries collect encrypted data today (ownership records, contracts) with the intent to decrypt it later once a sufficiently powerful quantum computer is developed. This threatens the immutable proof of ownership required for Sukuk.

### The Solution: Lattice-Based Cryptography
This application simulates the implementation of NIST-selected algorithms:
*   **CRYSTALS-Kyber**: For secure key encapsulation.
*   **CRYSTALS-Dilithium**: For secure digital signatures, replacing RSA/ECDSA.

## 🚀 Getting Started

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure API Key**:
    Ensure the `API_KEY` environment variable is set for the Google Gemini API.
4.  **Run the application**:
    ```bash
    npm start
    ```

## 📄 License

This project is open-source and available under the MIT License.