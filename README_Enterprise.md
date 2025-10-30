# BCX Connect 2.0 Enterprise

## Backend

```bash
cd BCXConnectBackend
dotnet restore
dotnet ef database update
dotnet run
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Configure environment variables:
- `ConnectionStrings__DefaultConnection`
- `Jwt__Key`
- `InternalAI__Url`
- `InternalAI__ApiKey`

Docker compose and IIS setup can be extended as needed.
