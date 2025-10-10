# Project Name

## 🚀 Tech Stack
**Backend:** .NET 8, Clean Architecture, DDD, CQRS, MediatR, FluentValidation, Repository Pattern  
**Frontend:** React, Redux Toolkit, Material UI, React Router

---

## 🧱 Architecture
- **Clean Architecture** with layered structure  
- **CQRS + MediatR** for clear Command/Query separation  
- **FluentValidation** for request validation  
- **Repository Pattern** for data access abstraction  
- **React + Redux Toolkit** for state management  
- **Material UI** for a modern and responsive UI  

---

## ⚙️ Setup

### Backend && Fronted
```bash
cd MutluGsmServer
dotnet restore
dotnet ef database update   # run this only if EF Core migrations exist
dotnet run

cd MutluGsmClient
npm install
npm run dev
