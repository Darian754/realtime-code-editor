# Real-Time Collaborative Code Editor  
*A live code collaboration tool built with ASP.NET Core, SignalR, and React/Blazor.*  

## **Overview**  
A web-based editor where multiple users can write/edit code in real-time (similar to Google Docs). Built to demonstrate:  
- Real-time communication with SignalR  
- Full-stack .NET development  
- Scalable cloud deployment  

## **Features**  
1. **Real-Time Collaboration**  
   - Live cursor positions of other users.  
   - Synchronized code changes across sessions.  
2. **Language Support**  
   - Syntax highlighting for C#, JavaScript, Python.  
3. **User Authentication**  
   - JWT-based login/registration.  
4. **Room Management**  
   - Create/join private coding rooms.  
5. **Version History**  
   - Save/load code snapshots (Git-like commits).  
6. **Responsive Design**  
   - Works on desktop and mobile.  

## **Tech Stack**  
| Component       | Technology                          |  
|-----------------|-------------------------------------|  
| **Backend**     | ASP.NET Core 8 Web API + SignalR    |  
| **Frontend**    | React (TypeScript) **or** Blazor WASM |  
| **Database**    | PostgreSQL (Entity Framework Core)  |  
| **Auth**        | JWT + ASP.NET Core Identity         |  
| **Real-Time**   | SignalR + Redis (for scaling)       |  
| **Deployment**  | Docker, Azure App Service (Free)    |  
| **Testing**     | xUnit (Backend), Jest (Frontend)   |  

## **Architecture**  
```plaintext
[Frontend] <-- WebSocket --> [SignalR Hub]  
                  |  
[ASP.NET Core API] <--> [PostgreSQL]  
                  |  
           [JWT Authentication]  
