FROM mcr.microsoft.com/dotnet/aspnet:9.0-preview AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src
COPY ["Jica/Jica.csproj", "Jica/"]
RUN dotnet restore "Jica/Jica.csproj"
COPY . .
RUN dotnet build "Jica/Jica.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Jica/Jica.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Jica.dll"] 