Wavify

**Wavify** is a React Native mobile app where users can upload and explore **AI-generated videos**.  
Every video upload includes the **video itself** and the **command (prompt)** used to generate it, making it easy to learn, get inspired, and discover creative AI ideas from others. 

---

Features
-  **Authentication** – Users must sign up or log in before accessing the app  
-  **Upload Videos** – Upload AI-generated videos with the exact command/prompt used  
-  **Browse & Watch** – Explore videos uploaded by other users  
-  **Prompt Sharing** – Learn how different prompts shape AI outputs  
-  **Creative Community** – Share your unique AI video ideas with others  

---

Tech Stack

- **Frontend**: React Native + Expo  
- **Backend**: Appwrite (Storage + Database)  
- **Libraries & Tools**:  
  - Expo AV (video playback)  
  - Expo Image/Document Picker  
  - React Native UI components  
  - GitHub for version control  

---

Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/areybakram/Wavify.git
   cd wavify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up **Appwrite**:
   - Create a new project in [Appwrite Cloud](https://cloud.appwrite.io/).
   - Enable **Authentication, Database, and Storage**.
   - Create a `.env` file in the project root with:
     ```env
     APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
     APPWRITE_PROJECT_ID=your_project_id
     APPWRITE_STORAGE_ID=your_storage_id
     APPWRITE_DATABASE_ID=your_database_id
     ```

4. Run the project:
   ```bash
   npx expo start
   ```
---

Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork this repo and open a Pull Request.  

---

## Created By:
 
Mohammad Areeb Akram
Mobile Application Developer 
LinkedIn: www.linkedin.com/in/areeb-akram-56a3a5348
 
