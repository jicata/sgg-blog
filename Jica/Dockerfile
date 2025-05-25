FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Copy and restore backend
COPY ["Jica/Jica.csproj", "Jica/"]
RUN dotnet restore "Jica/Jica.csproj"

# Copy everything
COPY . .

# Build frontend
WORKDIR /src/Jica/ui
RUN npm install
RUN npm run build

# Build backend
WORKDIR /src
RUN dotnet build "Jica/Jica.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Jica/Jica.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Copy the built frontend files
COPY --from=build /src/Jica/ui/dist /app/wwwroot
ENTRYPOINT ["dotnet", "Jica.dll"] 